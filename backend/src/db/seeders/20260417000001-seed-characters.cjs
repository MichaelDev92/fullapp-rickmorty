'use strict';

const https = require('node:https');

const API_URL = process.env.RICK_MORTY_API_URL || 'https://rickandmortyapi.com/api';
const TOTAL = 15;

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let raw = '';
        res.on('data', (c) => (raw += c));
        res.on('end', () => {
          try {
            resolve(JSON.parse(raw));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on('error', reject);
  });
}

function normalizeStatus(raw) {
  return ['Alive', 'Dead', 'unknown'].includes(raw) ? raw : 'unknown';
}
function normalizeGender(raw) {
  return ['Female', 'Male', 'Genderless', 'unknown'].includes(raw) ? raw : 'unknown';
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const data = await fetchJson(`${API_URL}/character?page=1`);
    const slice = data.results.slice(0, TOTAL);
    const now = new Date();
    const rows = slice.map((c) => ({
      external_id: c.id,
      name: c.name,
      status: normalizeStatus(c.status),
      species: c.species,
      type: c.type && c.type.length > 0 ? c.type : null,
      gender: normalizeGender(c.gender),
      origin_name: c.origin?.name || null,
      origin_url: c.origin?.url || null,
      location_name: c.location?.name || null,
      image: c.image || null,
      episodes_count: Array.isArray(c.episode) ? c.episode.length : 0,
      created: c.created ? new Date(c.created) : null,
      created_at: now,
      updated_at: now,
    }));
    await queryInterface.bulkInsert('characters', rows, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('characters', null, {});
  },
};

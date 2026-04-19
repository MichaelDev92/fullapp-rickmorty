import { useMutation } from '@apollo/client/react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { CharacterDetail } from '../features/characters/components/CharacterDetail';
import { useCharacter } from '../features/characters/hooks/useCharacter';
import { useFavorites } from '../features/characters/hooks/useFavorites';
import { CHARACTERS_QUERY } from '../features/characters/graphql/characters.query';
import { SOFT_DELETE_CHARACTER_MUTATION } from '../features/characters/graphql/toggleFavorite.mutation';
import { Skeleton } from '../shared/ui/Skeleton';
import { CommentList } from '@/features/comments/components/CommentList';
import { CommentForm } from '@/features/comments/components/CommentForm';

function MobileBackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      type="button"
      onClick={onBack}
      aria-label="Back to character list"
      className="sticky top-0 z-10 flex items-center gap-1 bg-[var(--color-bg)] px-4 py-3 text-sm font-medium text-[var(--color-primary)] md:hidden"
    >
      <ChevronLeft className="h-5 w-5" />
      Back
    </button>
  );
}

export function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { character, loading } = useCharacter(id);
  const { toggle } = useFavorites();
  const [softDelete] = useMutation(SOFT_DELETE_CHARACTER_MUTATION, {
    refetchQueries: [CHARACTERS_QUERY],
  });

  const handleBack = (): void => {
    navigate('/characters');
  };

  if (loading && !character) {
    // Keep layout stable during first fetch using skeleton placeholders.
    return (
      <div className="flex flex-col">
        <MobileBackButton onBack={handleBack} />
        <div className="flex flex-col gap-4 p-8">
          <Skeleton className="h-16 w-1/2" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-1/3" />
        </div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="flex flex-col">
        <MobileBackButton onBack={handleBack} />
        <div className="flex flex-1 items-center justify-center p-8 text-[var(--color-text-muted)]">
          Select a character from the list.
        </div>
      </div>
    );
  }

  const handleToggle = async (): Promise<void> => {
    await toggle({
      cacheId: character.id,
      backendId: character.externalId,
      currentIsFavorite: character.isFavorite,
    });
  };

  const handleSoftDelete = async (): Promise<void> => {
    // After soft delete, return to list to avoid stale detail route.
    await softDelete({ variables: { id: character.id } });
    navigate('/characters');
  };

  return (
    <div className="flex flex-col gap-6 md:p-4">
      <MobileBackButton onBack={handleBack} />
      <CharacterDetail
        character={character}
        onToggleFavorite={handleToggle}
        onSoftDelete={handleSoftDelete}
      />
      <section className="flex flex-col gap-4 px-4 pb-8 md:px-8">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          Comments
        </h3>
        <CommentList comments={character.comments} />
        <CommentForm characterId={character.externalId} characterGraphQlId={character.id} />
      </section>
    </div>
  );
}

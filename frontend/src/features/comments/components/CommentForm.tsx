import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../../../shared/ui/Button';
import { Input } from '../../../shared/ui/Input';
import { useAddComment } from '../hooks/useAddComment';

const schema = z.object({
  author: z.string().trim().min(2, 'At least 2 characters').max(80),
  body: z.string().trim().min(1, 'Comment cannot be empty').max(2000),
});

type FormValues = z.infer<typeof schema>;

interface CommentFormProps {
  characterId: number;
  characterGraphQlId: string;
}

export function CommentForm({
  characterId,
  characterGraphQlId,
}: CommentFormProps) {
  const { submit, loading } = useAddComment(characterGraphQlId);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { author: '', body: '' },
  });

  const onSubmit = handleSubmit(async (values) => {
    await submit({ characterId, ...values });
    reset();
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
          Your name
        </label>
        <Input {...register('author')} placeholder="Jane Doe" />
        {errors.author && <span className="text-xs text-red-500">{errors.author.message}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
          Comment
        </label>
        <textarea
          {...register('body')}
          rows={3}
          placeholder="Write your comment..."
          className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)]"
        />
        {errors.body && <span className="text-xs text-red-500">{errors.body.message}</span>}
      </div>
      <Button type="submit" disabled={loading} className="self-end">
        {loading ? 'Sending…' : 'Add comment'}
      </Button>
    </form>
  );
}

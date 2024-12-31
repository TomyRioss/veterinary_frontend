import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface FormInputsProps {
  error: {
    name?: string;
    description?: string;
  };
}

export function FormInputs({ error }: FormInputsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" />
        {error.name && <p className="text-destructive text-sm">{error.name}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">
          Description{' '}
          <span className="text-muted-foreground text-sm">(optional)</span>
        </Label>
        <Textarea id="description" name="description" rows={4} />
        {error.description && (
          <p className="text-destructive text-sm">{error.description}</p>
        )}
      </div>
    </>
  );
}

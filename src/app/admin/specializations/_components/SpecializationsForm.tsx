import { addSpecialization } from '../_actions/specializations';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function SpecializationsForm() {
  return (
    <form action={addSpecialization}>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" required />
      </div>
      <Button>Submit</Button>
    </form>
  );
}

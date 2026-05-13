import { FormControl } from '@angular/forms';

export interface CarteForm {
  nom: FormControl<string>;
  effet: FormControl<string>;
  description: FormControl<string>;
  type: FormControl<string>;
  atk: FormControl<string>;
  pdv: FormControl<string>;
  cout: FormControl<string>;
  id: FormControl<string>;
}

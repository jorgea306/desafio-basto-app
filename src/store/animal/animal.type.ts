export interface Animal {
    _id?: string,
    id_senasa: string;
    type_animal: string;
    weight: number;
    name: string;
    type_device: string;
    number_device: string
  }
  
  export interface AnimalState {
    animals: Animal[];
    selectedAnimal?: Animal;
    loading: boolean;
  }
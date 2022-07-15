import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    MenuItem,
} from '@mui/material';
import { useAppDispatch } from '../../store/redux-hooks';
import { createAnimal, deleteAnimal, getAnimals, updateAnimal } from '../../store/animal/animal.action';
import ModalComponent from '../../components/modalComponent/modalComponent';
import { Animal } from '../../store/animal/animal.type';



type AnimalModalProps = {
    openModal: boolean;
    onClose: (value: boolean) => void;
};

const AnimalModal: React.FC<AnimalModalProps> = ({
    openModal,
    onClose,
}) => {
    const dispatch = useAppDispatch();
    const [id_senasa, setId_senasa] = useState<string>('');
    const [type_animal, setType_animal] = useState<string>('');
    const [weight, setWeight] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [type_device, setType_device] = useState<string>('');
    const [number_device, setNumber_device] = useState<string>('');

    const isDisabled = () => {
        if (
            id_senasa === '' ||
            type_animal === '' ||
            name === '' ||
            type_device === '' ||
            number_device === '' ||
            id_senasa.length !== 16 ||
            number_device.length !== 8 ||
            name.length > 200
        ) {
            return true;
        }
        return false;
    };

 

    const saveSeniority = async () => {
        if (
            id_senasa?.trim() &&
            type_animal?.trim() &&
            name?.trim() &&
            type_device?.trim() &&
            number_device?.trim() &&
            id_senasa.length === 16 &&
            number_device.length === 8
        ) {
            await dispatch(
                createAnimal({
                    id_senasa,
                    type_animal,
                    weight,
                    name,
                    type_device,
                    number_device
                })
            );
            await dispatch(getAnimals())
        }
    };


    return (
        <ModalComponent
            openModal={openModal}
            onClose={onClose}
            onSave={saveSeniority}
            isDisabled={isDisabled}
            title="Agregar Animal"
            acceptButtonText="Guardar"
            cancelButtonText="Cancelar"
        >
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="standard">
                    <TextField
                        id="standard-adornment-amount"
                        value={id_senasa}
                        onChange={(e) => setId_senasa(e.target.value)}
                        required
                        helperText="El ID_Senasa debe ser de 16 caracteres"
                        variant="standard"
                        label="ID Senasa"
                    />

                </FormControl>

                <FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="standard">
                    <TextField
                        id="standard-select-currency"
                        select
                        label="Tipo de Animal"
                        value={type_animal}
                        onChange={e => setType_animal(e.target.value)}
                        helperText="Por favor selecciona el tipo de animal"
                        variant="standard"
                    >

                        <MenuItem key={0} value={'Novillo'}>
                            Novillo
                        </MenuItem>
                        <MenuItem key={1} value={'Toro'}>
                            Toro
                        </MenuItem>
                        <MenuItem key={2} value={'Vaquillona'}>
                            Vaquillona
                        </MenuItem>

                    </TextField>
                </FormControl>

                <FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount">Peso del Animal</InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        required
                    />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="standard">
                   
                   <TextField
                       id="standard-adornment-amount"
                       label="Nombre de Potrero"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       required
                       multiline
                       variant="standard"
                       helperText="El Nombre de Potrero debe tener 200 caracteres como maximo"
                   />
               </FormControl>

                <FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="standard">
                    <TextField
                        id="standard-select-currency"
                        select
                        label="Tipo de Dispositivo"
                        value={type_device}
                        onChange={e => setType_device(e.target.value)}
                        helperText="Por favor selecciona el tipo de dispositivo"
                        variant="standard"
                    >

                        <MenuItem key={0} value={'COLLAR'}>
                            COLLAR
                        </MenuItem>
                        <MenuItem key={1} value={'CARAVANA'}>
                            CARAVANA
                        </MenuItem>

                    </TextField>
                </FormControl>

                <FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="standard">
                    <TextField
                        id="standard-adornment-amount"
                        label="Numero de Dispositivo"
                        value={number_device}
                        onChange={(e) => setNumber_device(e.target.value)}
                        required
                        helperText="El Numero de Dispositivo debe contener 8 caracteres"
                        variant="standard"
                    />
                </FormControl>
            </Box>
        </ModalComponent>
    );
};

export default AnimalModal;

type AnimalModal2Props = {
    openModal2: boolean;
    onClose2: (value: boolean) => void;
    animal: Animal;
    edit: boolean;
};

export const AnimalModal2: React.FC<AnimalModal2Props> = ({
    openModal2,
    onClose2,
    animal,
}) => {

    const dispatch = useAppDispatch();
    const [id_senasa, setId_senasa] = useState<string>(animal.id_senasa);
    const [type_animal, setType_animal] = useState<string>(animal.type_animal);
    const [weight, setWeight] = useState<number>(animal.weight);
    const [name, setName] = useState<string>(animal.name);
    const [type_device, setType_device] = useState<string>(animal.type_device);
    const [number_device, setNumber_device] = useState<string>(animal.number_device);

    const isDisabled = () => {
        if (
            id_senasa === '' ||
            type_animal === '' ||
            name === '' ||
            type_device === '' ||
            number_device === '' ||
            id_senasa.length !== 16 ||
            number_device.length !== 8 ||
            name.length > 200
        ) {
            return true;
        }
        return false;
    };

    const removeAnimal = async () => {
        if (animal._id !== undefined) {
            await dispatch(deleteAnimal(animal._id));
            await dispatch(getAnimals());
        }
    }

    const update = async () => {
        if (animal._id !== undefined &&
            id_senasa?.trim() &&
            type_animal?.trim() &&
            name?.trim() &&
            type_device?.trim() &&
            number_device?.trim() &&
            id_senasa.length === 16 &&
            number_device.length === 8
        ) {
            await dispatch(
                updateAnimal(
                    animal._id,
                    {
                        id_senasa,
                        type_animal,
                        weight,
                        name,
                        type_device,
                        number_device
                    }
                )
            );
            await dispatch(getAnimals());
        }
    }



    return (
        <ModalComponent
            openModal={openModal2}
            onClose={onClose2}
            onSave={removeAnimal}
            onEdit={update}
            isDisabled={isDisabled}
            title="Animal"
            acceptButtonText="Aceptar"
            cancelButtonText="Cancelar"
            editButtonText="Editar"
            deleteButtonText="Eliminar"
            edit
        >
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount">ID Senasa</InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        value={id_senasa}
                        onChange={(e) => setId_senasa(e.target.value)}
                        required


                    />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="standard">
                    <TextField
                        id="standard-select-currency"
                        select
                        label="Tipo de Animal"
                        value={type_animal}
                        onChange={e => setType_animal(e.target.value)}
                        helperText="Por favor selecciona el tipo de animal"
                        variant="standard"
                    >

                        <MenuItem key={0} value={'Novillo'}>
                            Novillo
                        </MenuItem>
                        <MenuItem key={1} value={'Toro'}>
                            Toro
                        </MenuItem>
                        <MenuItem key={2} value={'Vaquillona'}>
                            Vaquillona
                        </MenuItem>

                    </TextField>
                </FormControl>

                <FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount">Peso del Animal</InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        required
                    />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="standard">
                   
                    <TextField
                        id="standard-adornment-amount"
                        label="Nombre de Potrero"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        multiline
                        variant="standard"
                        helperText="El Nombre de Potrero debe tener 200 caracteres como maximo"
                    />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="standard">
                    <TextField
                        id="standard-select-currency"
                        select
                        label="Tipo de Dispositivo"
                        value={type_device}
                        onChange={e => setType_device(e.target.value)}
                        helperText="Por favor selecciona el tipo de dispositivo"
                        variant="standard"
                    >

                        <MenuItem key={0} value={'COLLAR'}>
                            COLLAR
                        </MenuItem>
                        <MenuItem key={1} value={'CARAVANA'}>
                            CARAVANA
                        </MenuItem>

                    </TextField>
                </FormControl>

                <FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount">Numero de Dispositivo</InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        value={number_device}
                        onChange={(e) => setNumber_device(e.target.value)}
                        required
                    />
                </FormControl>
            </Box>
        </ModalComponent >
    );
};

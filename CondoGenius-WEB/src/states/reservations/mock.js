import churrasqueira from '../../assets/churrasqueira.jpeg';
import salaoEventos from '../../assets/salaoEventos.jpeg';
import salaJogos from '../../assets/salaJogos.jpeg';

export const areas = [
    { id: 1, image: churrasqueira, alt: 'Image 1', name: 'Churrasqueira', limit: '40' },
    { id: 2, image: salaoEventos, alt: 'Image 2', name: 'Salão de eventos', limit: '100' },
    { id: 3, image: salaJogos, alt: 'Image 3', name: 'Sala de jogos', limit: '25' },
];

export const reservations = [
    { id: 1, image: churrasqueira, alt: 'Image 1', name: 'Churrasqueira', date: '09/02/2020', resident: 'Rodrigo'},
    { id: 2, image: salaoEventos, alt: 'Image 2', name: 'Salão de eventos', date: '09/02/20200', resident: 'Hellen'},
]

export const guestList = [
    { id: 1, name: 'Sara', document: '08389750265'},
    { id: 2, name: 'Hellen', document: '08389750265'},
    { id: 3, name: 'Julia', document: '08389750265'},
    { id: 4, name: 'Cris', document: '08389750265'},
]
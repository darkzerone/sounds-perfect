export const regions = [
  { id: 'utrecht', name: 'Utrecht' },
  { id: 'de-meern', name: 'De Meern' },
  { id: 'nieuwegein', name: 'Nieuwegein' },
  { id: 'houten', name: 'Houten' },
  { id: 'zeist', name: 'Zeist' },
  { id: 'vleuten', name: 'Vleuten' },
  { id: 'maarssen', name: 'Maarssen' },
  { id: 'ijsselstein', name: 'IJsselstein' },
  { id: 'breukelen', name: 'Breukelen' },
  { id: 'vianen', name: 'Vianen' },
  { id: 'woerden', name: 'Woerden' },
  { id: 'amersfoort', name: 'Amersfoort' },
  { id: 'bilthoven', name: 'Bilthoven' },
  { id: 'bunnik', name: 'Bunnik' },
  { id: 'de-bilt', name: 'De Bilt' }
];

export const getRegionById = (id) => {
  return regions.find(region => region.id === id);
};

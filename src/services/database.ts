export interface RecipeWithIngredients {
  id: string;
  name: string;
  preparation?: string;
  selling_price: number;
  is_hidden?: boolean;
}

export const fetchRecipesWithIngredients = async (): Promise<RecipeWithIngredients[]> => {
  // Mock data for now
  return [
    {
      id: '1',
      name: 'Idly Podi',
      preparation: 'Classic South Indian spice blend perfect with idly, dosa, and rice',
      selling_price: 120,
      is_hidden: false
    },
    {
      id: '2',
      name: 'Sambar Powder',
      preparation: 'Authentic sambar masala blend with perfect balance of spices',
      selling_price: 140,
      is_hidden: false
    },
    {
      id: '3',
      name: 'Rasam Powder',
      preparation: 'Tangy and spicy rasam powder for the perfect South Indian soup',
      selling_price: 140,
      is_hidden: false
    }
  ];
};
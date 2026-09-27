import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useAppDispatch } from '@/store/hooks';
import { getAll } from "@/store/features/productsSlice";
import { show } from '@/store/features/alertsSlice';
import { IProduct } from '@/types/product';
import { ICategory } from '@/types/category';
import Helpers from '@/helpers';


type AutocompleteOption = {
  id: number;
  label: string;
}

function SortedProducts() {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<AutocompleteOption | null>(null);
  const [categories, setCategories] = useState<AutocompleteOption[]|[]>([]);
  
  useEffect(() => {
		async function getData() {
			const result = await fetch('/api/backend/category');

			if(result.ok){
				const data = await result.json();
				let sorted = Helpers.sortedItems(data);
        const newSorted = sorted.map((item: ICategory) => {
          return {
            id: item.id,
            label: item.name
          }
        });

				setCategories(newSorted);
			}else{
				dispatch(show({
					text:'Ошибка при получении категорий! Перезагрузите страницу и попробуйте снова!',
					type:'error',
				}));
			}
		}

		getData();
	}, [dispatch]);

  const setProductsByCategory = async (value:AutocompleteOption|null) => {
    setSelected(value);
    
    if(value){
      const result = await fetch('/api/backend/catalog/category/' + value.id);

      if(result.ok){
        const data = await result.json();
        let sorted = Helpers.sortedItems(data);
        dispatch(getAll(sorted));
      }else{
        dispatch(show({
          text:'Ошибка при получении категорий! Перезагрузите страницу и попробуйте снова!',
          type:'error',
        }));
      }
    }

    if(value === null){
      const result = await fetch('/api/backend/catalog');

			if(result.ok){
				const data = await result.json();
				let sorted = Helpers.sortedItems(data);
				dispatch(getAll(sorted));
			}else{
				dispatch(show({
					text:'Ошибка при получении продуктов! Перезагрузите страницу и попробуйте снова!',
					type:'error',
				}));
			}
    }
  };

  return ( 
    <Grid
      mt={2} 
      display={"flex"} 
      container>
      <Grid item>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          isOptionEqualToValue={(option, value) => option.id === value.id}
          options={categories}
          sx={{ width: 300 }}
          value={selected}
          onChange={(event, value) => {
            setProductsByCategory(value);
          }}
          renderInput={(params) => <TextField key={params.id} {...params} label="Категории" />}
        />
      </Grid>
    </Grid>
  );
}

export default SortedProducts;
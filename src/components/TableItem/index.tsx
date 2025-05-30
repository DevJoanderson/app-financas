import * as C from './styles';
import { Item } from '../../types/Item';
import { formatDate } from '../../helpers/dateFilter';
import { categories } from '../../data/categories';
import { FaEdit, FaTrashAlt } from "react-icons/fa";

type Props = {
  item: Item;
  onDelete: (item: Item) => void;
  onEdit: (item: Item) => void;
};

export const TableItem = ({ item, onDelete, onEdit }: Props) => {
  const categoria = categories[item.category]; // pode ser undefined

  return (
    <C.TableLine>
      <C.TableColumn>{formatDate(item.date)}</C.TableColumn>

      <C.TableColumn>
        <C.Category color={categoria?.color ?? '#ccc'}>
          {categoria?.title ?? item.category}
        </C.Category>
      </C.TableColumn>

      <C.TableColumn>{item.title}</C.TableColumn>

      <C.TableColumn>
        <C.Value color={categoria?.expense ? 'red' : 'green'}>
          R$ {item.value}
        </C.Value>
      </C.TableColumn>

      <C.TableColumn>
        <FaEdit
          style={{ cursor: 'pointer', marginRight: '10px' }}
          onClick={() => onEdit(item)}
        />
        <FaTrashAlt
          style={{ cursor: 'pointer', color: 'red' }}
          onClick={() => onDelete(item)}
        />
      </C.TableColumn>
    </C.TableLine>
  );
};

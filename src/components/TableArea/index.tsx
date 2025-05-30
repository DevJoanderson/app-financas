import * as C from './styles';
import { Item } from '../../types/Item';
import { TableItem } from '../TableItem';

type Props = {
  list: Item[];
  onDelete: (item: Item) => void;
  onEdit: (item: Item) => void;
};

export const TableArea = ({ list, onDelete, onEdit }: Props) => {
  return (
    <C.TableWrapper>
      <C.Table>
        <thead>
          <tr>
            <C.TableHeadColumn width={100}>Data</C.TableHeadColumn>
            <C.TableHeadColumn width={130}>Categoria</C.TableHeadColumn>
            <C.TableHeadColumn>Título</C.TableHeadColumn>
            <C.TableHeadColumn width={150}>Valor</C.TableHeadColumn>
            <C.TableHeadColumn width={100}>Ações</C.TableHeadColumn>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <TableItem key={index} item={item} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </tbody>
      </C.Table>
    </C.TableWrapper>
  );
};

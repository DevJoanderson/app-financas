import * as C from './styles';

export const Footer = () => {
  return (
    <C.Container>
      Desenvolvido por <strong>Joanderson</strong> • <strong>FirstByte</strong> © {new Date().getFullYear()}
    </C.Container>
  );
};

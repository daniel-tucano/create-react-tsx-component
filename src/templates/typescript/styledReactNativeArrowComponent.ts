import CreateComponent from '../interfaces/CreateComponent'
import creatReactImport from '../shared/functions/create-react-import'

export default ({
  componentName,
  useReactImport,
  useReactFC,
  useInterface
}: CreateComponent) =>
  `${creatReactImport(useReactImport)}import { Text } from 'react-native';

import { Container } from './styles';
${useInterface
  ? `interface ${componentName}Props {

}
`
  : ''}
const ${componentName}${useReactFC ? `: React.FC${useInterface ? `<${componentName}Props>` : ''}` : ''} = (${useInterface &&
  `{

}: ${componentName}Props`}) => {
  return (
    <Container>
      <Text>${componentName}</Text>
    </Container>
  );
};

export default ${componentName};
`

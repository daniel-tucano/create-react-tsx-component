import CreateComponent from '../interfaces/CreateComponent'
import creatReactImport from '../shared/functions/create-react-import'

export default ({ componentName, useReactImport, useInterface }: CreateComponent) => (
`${creatReactImport(useReactImport)}import { Text } from 'react-native';

import { Container } from './styles';
${useInterface
  ? `interface ${componentName}Props {

}`
  : ''}

function ${componentName}(${useInterface
  ? `{

}: ${componentName}Props`
  : ''}) {
  return (
    <Container>
      <Text>${componentName}</Text>
    </Container>
  );
};

export default ${componentName};
`
)

import CreateComponent from '../interfaces/CreateComponent'
import creatReactImport from '../shared/functions/create-react-import'

export default ({ componentName, useReactImport, useInterface }: CreateComponent) => (
`${creatReactImport(useReactImport)}${useInterface
  ? `interface ${componentName}Props {

}`
  : ''}

function ${componentName}(${useInterface
  ? `{

}: ${componentName}Props`
  : ''}) {
  
  return (
    <h1>${componentName}</h1>
  );
}

export default ${componentName};
`
)

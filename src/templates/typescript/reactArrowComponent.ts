import CreateComponent from '../interfaces/CreateComponent'
import creatReactImport from '../shared/functions/create-react-import'

export default ({ componentName, useReactImport, useReactFC, useInterface }: CreateComponent) => (
`${creatReactImport(useReactImport)}
${useInterface
  ? `interface ${componentName}Props {

}`
  : ''}

const ${componentName}${useReactFC ? `: React.FC${useInterface ? `<${componentName}Props>` : ''}` : ''} = (${useInterface
  ? `{

}: ${componentName}Props`
  : ''}) => {
  return (
    <h1>${componentName}</h1>
  );
}

export default ${componentName};
`
)

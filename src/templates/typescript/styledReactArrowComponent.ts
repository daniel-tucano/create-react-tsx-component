import CreateComponent from '../interfaces/CreateComponent'
import creatReactImport from '../shared/functions/create-react-import'
import createStylesImport from '../shared/functions/create-styles-import'

export default ({
  componentName,
  styleName,
  useReactImport,
  useReactFC,
  useCSSModule,
  useInterface
}: CreateComponent) =>
  `${creatReactImport(useReactImport)}${createStylesImport(
    styleName,
    useCSSModule
  )}
${useInterface
  ? `interface ${componentName}Props {

}`
  : ''}

const ${componentName}${useReactFC ? `: React.FC${useInterface ? `<${componentName}Props>` : ''}` : ''} = (${useInterface
  ? `{

}: ${componentName}Props`
  : ''}) => {
  return (
    ${styleName === 'styles' ? '<Container>' : '<>'}
      <h1>${componentName}</h1>
    ${styleName === 'styles' ? '</Container>' : '</>'}
  );
};

export default ${componentName};
`

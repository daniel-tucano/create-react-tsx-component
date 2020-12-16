import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'

import tsReactComponent from './templates/typescript/reactComponent'
import tsStyledReactComponent from './templates/typescript/styledReactComponent'

import tsReactArrowComponent from './templates/typescript/reactArrowComponent'
import tsStyledReactArrowComponent from './templates/typescript/styledReactArrowComponent'

import tsReactNativeComponent from './templates/typescript/reactNativeComponent'
import tsStyledReactNativeComponent from './templates/typescript/styledReactNativeComponent'

import tsReactNativeArrowComponent from './templates/typescript/reactNativeArrowComponent'
import tsStyledReactNativeArrowComponent from './templates/typescript/styledReactNativeArrowComponent'

import jsReactComponent from './templates/javascript/reactComponent'
import jsStyledReactComponent from './templates/javascript/styledReactComponent'

import jsReactArrowComponent from './templates/javascript/reactArrowComponent'
import jsStyledReactArrowComponent from './templates/javascript/styledReactArrowComponent'

import jsReactNativeComponent from './templates/javascript/reactNativeComponent'
import jsStyledReactNativeComponent from './templates/javascript/styledReactNativeComponent'

import jsReactNativeArrowComponent from './templates/javascript/reactNativeArrowComponent'
import jsStyledReactNativeArrowComponent from './templates/javascript/styledReactNativeArrowComponent'

import styledFileCSS from './templates/styled-components/styledFileCSS'
import styledFileReact from './templates/styled-components/styledFileReact'
import styledFileReactNative from './templates/styled-components/styledFileReactNative'

interface ComponentProps {
  dir?: string;
  named: boolean;
  styled?: boolean;
  mobile?: boolean;
}

export default async (
  componentName: string,
  { dir, named, styled, mobile }: ComponentProps
) => {
  // Load configurations.
  const config = vscode.workspace.getConfiguration('createReactTSXComponent')

  const fileExtension = config.get('fileExtension') as string
  const cssFileFormat = config.get('stylesFormat') as string
  const useArrowFunctionComponent = config.get(
    'useArrowFunctionComponent'
  ) as boolean
  const useReactFC = config.get('useReactFC') as boolean
  const useReactImport = config.get('useReactImport') as boolean
  const useCSSModule = config.get('useCSSModule') as boolean
  const useIndex = config.get('useIndex') as boolean
  const useNamedStyleFile = config.get('useNamedStyleFile') as boolean
  const useInterface = config.get('useInterface') as boolean
  const defaultFolderPath = config.get('defaultFolderPath') as string

  const componentsExtensions = ['tsx', 'jsx', 'js']
  const stylesFormats = ['Styled Components', 'SCSS', 'LESS', 'CSS']

  const componentsFileNames = ['index.tsx', 'index.jsx', 'index.js']

  let stylesFileNames: string[]
  let importStylesFileNames: string[]

  const baseStyleFileName = useNamedStyleFile ? componentName : 'styles'

  if (useCSSModule) {
    stylesFileNames = [
      `${baseStyleFileName}.ts`,
      `${baseStyleFileName}.module.scss`,
      `${baseStyleFileName}.less`,
      `${baseStyleFileName}.module.css`
    ]
    importStylesFileNames = [
      `${baseStyleFileName}`,
      `${baseStyleFileName}.module.scss`,
      `${baseStyleFileName}.less`,
      `${baseStyleFileName}.module.css`
    ]
  } else {
    stylesFileNames = [
      `${baseStyleFileName}.ts`,
      `${baseStyleFileName}.scss`,
      `${baseStyleFileName}.less`,
      `${baseStyleFileName}.css`
    ]
    importStylesFileNames = [
      `${baseStyleFileName}`,
      `${baseStyleFileName}.scss`,
      `${baseStyleFileName}.less`,
      `${baseStyleFileName}.css`
    ]
  }

  const componentExtensionIndex = componentsExtensions.findIndex(
    (ext) => ext === fileExtension
  )
  const cssFormatIndex = stylesFormats.findIndex(
    (style) => style === cssFileFormat
  )

  let componentFileName: string

  if (named) {
    componentFileName = `${componentName}.${fileExtension}`
  } else {
    if (useIndex) {
      componentFileName = componentsFileNames[componentExtensionIndex]
    } else {
      componentFileName = `${componentName}.${fileExtension}`
    }
  }

  const styledFileName =
    ['jsx', 'js'].includes(fileExtension) && cssFormatIndex === 0
      ? 'styles.js'
      : stylesFileNames[cssFormatIndex]
  const styleName = importStylesFileNames[cssFormatIndex]

  const styledTemplate = cssFormatIndex === 0 ? styledFileReact : styledFileCSS

  let reactComponent = tsReactComponent
  let reactArrowComponent = tsReactArrowComponent
  let styledReactComponent = tsStyledReactComponent
  let styledReactArrowComponent = tsStyledReactArrowComponent
  let reactNativeComponent = tsReactNativeComponent
  let reactNativeArrowComponent = tsReactNativeArrowComponent
  let styledReactNativeComponent = tsStyledReactNativeComponent
  let styledReactNativeArrowComponent = tsStyledReactNativeArrowComponent

  if (['jsx', 'js'].includes(fileExtension)) {
    reactComponent = jsReactComponent
    reactArrowComponent = jsReactArrowComponent
    styledReactComponent = jsStyledReactComponent
    styledReactArrowComponent = jsStyledReactArrowComponent
    reactNativeComponent = jsReactNativeComponent
    reactNativeArrowComponent = jsReactNativeArrowComponent
    styledReactNativeComponent = jsStyledReactNativeComponent
    styledReactNativeArrowComponent = jsStyledReactNativeArrowComponent
  }

  const projectRoot = (vscode.workspace.workspaceFolders as any)[0].uri.fsPath

  componentName = componentName.split(' ').join('')

  if (!dir && defaultFolderPath.length > 0) {
    dir = defaultFolderPath
  }

  if (!dir) {
    dir =
      (await vscode.window.showInputBox({
        value: '/',
        prompt: 'Path from root',
        ignoreFocusOut: true,
        valueSelection: [-1, -1]
      })) || ''
  }

  if (!dir.includes(projectRoot)) {
    dir = projectRoot + dir
  }

  if (dir[dir.length - 1] !== '/') {
    dir = dir + '/'
  }

  let dirWithFileName: string

  if (!named) {
    dirWithFileName = dir + componentName

    createDir(dirWithFileName)
  }

  const filePath = (fileName: string) => {
    if (named) {
      return dir + '/' + fileName
    }

    return dirWithFileName + '/' + fileName
  }

  if (mobile) {
    if (styled) {
      if (useArrowFunctionComponent) {
        await createFile(
          filePath(componentFileName),
          styledReactNativeArrowComponent({
            componentName,
            useReactImport,
            useReactFC,
            useInterface
          })
        )

        await createFile(filePath(styledFileName), styledFileReactNative())
      } else {
        await createFile(
          filePath(componentFileName),
          styledReactNativeComponent({
            componentName,
            useReactImport
          })
        )

        await createFile(filePath(styledFileName), styledFileReactNative())
      }
    } else {
      if (useArrowFunctionComponent) {
        await createFile(
          filePath(componentFileName),
          reactNativeArrowComponent({
            componentName,
            useReactImport,
            useReactFC,
            useInterface
          })
        )
      } else {
        await createFile(
          filePath(componentFileName),
          reactNativeComponent({ componentName, useReactImport })
        )
      }
    }
  } else {
    if (styled) {
      if (useArrowFunctionComponent) {
        await createFile(
          filePath(componentFileName),
          styledReactArrowComponent({
            componentName,
            styleName,
            useReactImport,
            useReactFC,
            useCSSModule,
            useInterface
          })
        )

        await createFile(filePath(styledFileName), styledTemplate())
      } else {
        await createFile(
          filePath(componentFileName),
          styledReactComponent({
            componentName,
            styleName,
            useReactImport,
            useCSSModule,
            useInterface
          })
        )

        await createFile(filePath(styledFileName), styledTemplate())
      }
    } else {
      if (useArrowFunctionComponent) {
        await createFile(
          filePath(componentFileName),
          reactArrowComponent({
            componentName,
            useReactImport,
            useReactFC,
            useCSSModule,
            useInterface
          })
        )
      } else {
        await createFile(
          filePath(componentFileName),
          reactComponent({
            componentName,
            useReactImport,
            useCSSModule,
            useInterface
          })
        )
      }
    }
  }

  setTimeout(() => {
    vscode.workspace
      .openTextDocument(filePath(componentFileName))
      .then((editor) => {
        if (!editor) {
          return
        }
        vscode.window.showTextDocument(editor)
      })
  }, 50)
}

const createDir = (targetDir: string) => {
  const sep = path.sep
  const initDir = path.isAbsolute(targetDir) ? sep : ''
  const baseDir = __dirname

  return targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir)
    try {
      fs.mkdirSync(curDir)
    } catch (err) {
      if (err.code === 'EEXIST') {
        // curDir already exists!
        return curDir
      }

      // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
      if (err.code === 'ENOENT') {
        // Throw the original parentDir error on curDir `ENOENT` failure.
        throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`)
      }

      const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1
      if (!caughtErr || (caughtErr && curDir === path.resolve(targetDir))) {
        throw err // Throw if it's just the last created dir.
      }
    }

    return curDir
  }, initDir)
}

const createFile = async (filePath: string, content: string | string[]) => {
  if (!fs.existsSync(filePath)) {
    await fs.createWriteStream(filePath).close()
    await fs.writeFile(filePath, content, (err) => {
      if (err) {
        vscode.window.showErrorMessage('Maker cant write to file.')
      }
    })
  } else {
    vscode.window.showWarningMessage('File already exists.')
  }
}

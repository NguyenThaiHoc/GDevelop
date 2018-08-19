// @flow
import * as React from 'react';
import { setupAutocompletions } from './LocalCodeEditorAutocompletions';
import PlaceholderLoader from '../UI/PlaceholderLoader';
import RaisedButton from 'material-ui/RaisedButton';
import PreferencesContext from '../MainFrame/Preferences/PreferencesContext';
import { getAllThemes } from './Theme';

export type State = {|
  MonacoEditor: ?any,
  error: ?Error,
|};
export type Props = {|
  value: string,
  onChange: string => void,
  width: number,
  onEditorMounted?: () => void,
|};

const monacoEditorOptions = {
  scrollBeyondLastLine: false,
  minimap: {
    enabled: false,
  },
};

// There is only a single instance of monaco living, keep track
// of if its initialized or not.
let monacoCompletionsInitialized = false;
let monacoThemesInitialized = false;

export class CodeEditor extends React.Component<Props, State> {
  state = {
    MonacoEditor: null,
    error: null,
  };

  setupEditorThemes = (monaco: any) => {
    if (!monacoThemesInitialized) {
      monacoThemesInitialized = true;

      getAllThemes().forEach(codeEditorTheme => {
        // Builtin themes don't have themeData, don't redefine them.
        if (codeEditorTheme.themeData) {
          console.log(codeEditorTheme.themeName);
          console.log(codeEditorTheme.themeData);
          monaco.editor.defineTheme(
            codeEditorTheme.themeName,
            codeEditorTheme.themeData
          );
        }
      });
    }
  }

  setupEditorCompletions = (editor: any, monaco: any) => {
    if (!monacoCompletionsInitialized) {
      monacoCompletionsInitialized = true;

      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        // noLib: true,
        target: monaco.languages.typescript.ScriptTarget.ES6,
        allowNonTsExtensions: true,
        allowJs: true,
        checkJs: true,
      });
      setupAutocompletions(monaco);
    }

    if (this.props.onEditorMounted) this.props.onEditorMounted();
  };

  componentDidMount() {
    this.loadMonacoEditor();
  }

  handleLoadError(error: Error) {
    this.setState({
      error,
    });
  }

  loadMonacoEditor() {
    this.setState({
      error: null,
    });
    import(/* webpackChunkName: "react-monaco-editor" */ 'react-monaco-editor')
      .then(module =>
        this.setState({
          MonacoEditor: module.default,
        })
      )
      .catch(this.handleLoadError);
  }

  render() {
    const { MonacoEditor, error } = this.state;
    if (error) {
      return (
        <React.Fragment>
          <p>Unable to load the code editor</p>
          <RaisedButton label="Retry" onClick={this.loadMonacoEditor} />
        </React.Fragment>
      );
    }

    if (!MonacoEditor) {
      return <PlaceholderLoader />;
    }

    return (
      <PreferencesContext.Consumer>
        {({ values }) => (
          console.log(values.codeEditorThemeName) || <MonacoEditor
            width={this.props.width || 600}
            height="400"
            language="javascript"
            theme={values.codeEditorThemeName}
            value={this.props.value}
            onChange={this.props.onChange}
            editorWillMount={this.setupEditorThemes}
            editorDidMount={this.setupEditorCompletions}
            options={monacoEditorOptions}
          />
        )}
      </PreferencesContext.Consumer>
    );
  }
}
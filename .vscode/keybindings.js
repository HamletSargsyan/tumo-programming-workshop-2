// Place your key bindings in this file to override the defaultsauto[]
[
    {
        "key": "ctrl+f",
        "command": "-cursorRight",
        "when": "textInputFocus"
    },
    {
        "key": "ctrl+f",
        "command": "editor.action.formatDocument",
        "when": "editorHasDocumentFormattingProvider && editorTextFocus && !editorReadonly && !inCompositeEditor"
    },
    {
        "key": "shift+alt+f",
        "command": "-editor.action.formatDocument",
        "when": "editorHasDocumentFormattingProvider && editorTextFocus && !editorReadonly && !inCompositeEditor"
    }
]

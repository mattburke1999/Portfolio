export type PhraseWord = {
    text: string;
    class: string;
}

export type Phrase = [PhraseWord, PhraseWord, PhraseWord, PhraseWord];

export const phrases: Phrase[] = [
    [
        {text: "full-stack&nbsp;", class: 'highlight2'},
        {text: "web&nbsp;", class: ''},
        {text: "developer", class: 'highlight3'},
        {text: ".", class: ''}
    ],
    [
        {text: "curious&nbsp;", class: 'highlight2'},
        {text: "problem&nbsp;", class: ''},
        {text: "solver", class: 'highlight3'},
        {text: ".", class: ''}
    ],
    [
        {text: "detail-oriented&nbsp;", class: 'highlight2'},
        {text: "data&nbsp;", class: ''},
        {text: "analyst", class: 'highlight3'},
        {text: ".", class: ''}
    ],
    [
        {text: "creative&nbsp;", class: 'highlight2'},
        {text: "software&nbsp;", class: ''},
        {text: "engineer", class: 'highlight3'},
        {text: ".", class: ''}
    ],
    [
        {text: "reliable&nbsp;", class: 'highlight2'},
        {text: "team&nbsp;", class: ''},
        {text: "player", class: 'highlight3'},
        {text: ".", class: ''}
    ]
];
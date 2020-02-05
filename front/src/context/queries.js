import { gql } from 'apollo-boost';

export const DELETE_BLOCK = gql`
    mutation deleteBlock($path: [Int]) {
        deleteBlock(path: $path)
    }
`

export const RENAME_BLOCK = gql`
    mutation renameBlock($path: [Int], $newName: String) {
        renameBlock(path: $path, newName: $newName) {
            name
        }
    }
`

export const ADD_CARD = gql`
    mutation {
        addCard {
            id
        }
    }
`
export const SAVE_BLOCKS = gql`
    mutation Blocks($newBlocks: [JSON]) {
        saveBlocks (newBlocks: $newBlocks)
    }
`;

export const GET_BLOCKS = gql`
    {
        blocks 
    }
`;

export const GET_CARD = gql`
    mutation Card($id: ID!) {
        card (id: $id) {
            id
            template_title
            entries {
                id
                name
                content
                entry_type
            }
        }
    }
`;

export const SAVE_CARD = gql`
    mutation SaveCard($id: ID, $template_title:String, $entries: [JSON]) { 
            saveCard(id: $id, template_title: $template_title, entries: $entries) {
            id
            entries {
                content
            }
        }
    }
`;

export const ADD_CARD_ENTRY = gql`
    mutation AddCardEntry($id: Int, $name: String, $content: JSON, $entry_type: String, $card_id: ID) {
        addCardEntry(id: $id, name: $name, content: $content, entry_type: $entry_type, card_id: $card_id) {
            id
            content
        }
    }
`;
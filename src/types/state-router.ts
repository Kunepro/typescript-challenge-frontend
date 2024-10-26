import { AppParams } from './app-params'

// Now this might sound weird, why StateRouter and not RouterState?
// Usually when you are typing a state you might not remember the exact name,
// autocomplete can help, so naming by specificity helps auto-complete
// narrow down the options, even if it doesn't sound as fluent in English.

// Typing State... will give you the list of states and you can select the one
// you want.
// On the other hand, if you don't remember the name of the state, autocomplete
// will not help you as much.
// I did not rename RootState, but I think it would be better as StateRoot.

export interface StateRouter {
  readonly url: string
  readonly params: AppParams
}

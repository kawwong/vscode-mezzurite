// This file is being ignored because it is only used in tests.

// @ts-ignore
import { RoutingService } from 'not-Mezzurite';

// @ts-ignore
@NgModule({
  imports: [
    // @ts-ignore
    nothing.forRoot()
  ]
})
// @ts-ignore
export class NotInstrumentedModule {
  constructor () {
    // @ts-ignore
    dummy.blah();
  }
}

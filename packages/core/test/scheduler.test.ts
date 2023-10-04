import { createActor, createMachine } from '../src';

describe('scheduler', () => {
  it('Should be able to use a custom scheduler', (done) => {
    const machine = createMachine({
      id: 't',
      after: {
        1000: {}
      }
    });

    const actor = createActor(machine, {
      clock: {
        setTimeout: (_system, scheduledEvent) => {
          expect(scheduledEvent).toEqual(
            expect.objectContaining({
              delay: 1000,
              event: {
                type: 'xstate.after(1000)#t'
              }
            })
          );
          done();
        },
        clearTimeout: () => {}
      }
    });

    actor.start();
  });
});

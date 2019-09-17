import { Command, flags } from '@oclif/command';
import TapjawIterator from './tapjaw-iterator';
import TapjawAdapter from './tapjaw-adapter';
import { IConfig } from '@oclif/config';

export default abstract class TapjawCommand extends Command {
    static args = [];
    static defaultFlags: flags.Input<any> = {
        help: flags.help({ char: 'h' }),
    };

    abstract instance: any; // @todo see if we can honour Parser.Input
    abstract flags: flags.Input<any>;

    protected abstract iterator: TapjawIterator;
    protected abstract adapter: TapjawAdapter;

    // protected setDependency(adapter: TapjawAdapter, iterator: TapjawIterator): void {
    //     this.adapter = adapter;
    //     this.iterator = iterator;
    // }

    async run() {
        const { args, flags } = this.parse(this.instance);

        this.log('hi');
    }
}

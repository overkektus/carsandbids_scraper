import 'reflect-metadata';
import { Container } from 'inversify';
import { BidObserver } from './BidObserver';

const container = new Container();
container.bind<BidObserver>('BidObserver').to(BidObserver).inSingletonScope();

export { container };

import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component";

describe('HeroesComponent', () => {
    const HEROES = [
        {id: 1, name: 'SpideDude', strength: 8},
        {id: 2, name: 'WOnderful Woman', strength: 24},
        {id: 3, name: 'SuperDude', strength: 55}
    ];

    describe('delete', () => {
        it('should remove the indicated hero from the heroes list', () => {
            const mockHeroService = jasmine.createSpyObj(['deleteHero']);
            mockHeroService.deleteHero.and.returnValue(of());
            const component = new HeroesComponent(mockHeroService);
            component.heroes = [...HEROES];
            const HeroToDelete = HEROES[1];

            component.delete(HeroToDelete);

            expect(component.heroes.length).toBe(2);
            expect(
                component.heroes.find(hero => hero.id == HeroToDelete.id)
            ).toBeUndefined();
        });
        it('should call deleteHero on HeroService', ()=> {
            const mockHeroService = jasmine.createSpyObj(['deleteHero']);
            const mockObservable = jasmine.createSpyObj(['subscribe']);
            mockHeroService.deleteHero.and.returnValue(mockObservable);
            const component = new HeroesComponent(mockHeroService);
            component.heroes = [...HEROES];
            const HeroToDelete = HEROES[2];

            component.delete(HeroToDelete);

            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HeroToDelete);
            expect(mockObservable.subscribe).toHaveBeenCalled();
        });
    });
})
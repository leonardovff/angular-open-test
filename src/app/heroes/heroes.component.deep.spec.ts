import { Directive, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";

@Directive({
    selector: '[routerLink]',
    host: { '(click)': 'onClick()'}
})
export class RouterLinkDirectiveStub {
    @Input('routerLink') linksParams: any;
    navigatedTo: any = null;

    onClick() {
        console.log('console.log')
        this.navigatedTo = this.linksParams;
    }
}


describe('HeroesComponent (deep)', ()=> {
    const HEROES: Hero[] = [
        {id: 1, name: 'SpideDude', strength: 8},
        {id: 2, name: 'WOnderful Woman', strength: 24},
        {id: 3, name: 'SuperDude', strength: 55}
    ];
    const setupTestBed = () => {
        const mockHeroesService = jasmine.createSpyObj(['getHeroes', 'addHero']);
        
        TestBed.configureTestingModule({
            declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
            providers: [{
                provide: HeroService, useValue: mockHeroesService
            }],
            // schemas: [NO_ERRORS_SCHEMA]
        });
        return { mockHeroesService };
    }
    const createComponent = () => {
        const fixture: ComponentFixture<HeroesComponent> = TestBed.createComponent(
            HeroesComponent
        );
        return { fixture }
    }

    it('should render each hero as a HeroComponent', () => {
        const { mockHeroesService } = setupTestBed();
        mockHeroesService.getHeroes.and.returnValue(of(HEROES));

        const { fixture } = createComponent();
        fixture.detectChanges();
        
        const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentDEs.length).toEqual(HEROES.length);
        for(let i = 0; i < HEROES.length; i ++){
            expect(heroComponentDEs[i].componentInstance.hero.name).toBe(HEROES[i].name);
        }
    });
    it(`should call heroService.deleteHero when the Hero Component's delete button 
        is clecked`, () => {
        const { mockHeroesService } = setupTestBed();
        mockHeroesService.getHeroes.and.returnValue(of(HEROES));
        const { fixture } = createComponent();
        spyOn(fixture.componentInstance, 'delete');
        
        fixture.detectChanges();
        const heroComponentDes = fixture.debugElement.queryAll(By.directive(HeroComponent));
        // (<HeroComponent>heroComponentDes[0].componentInstance).delete.emit(undefined);
        heroComponentDes[0].triggerEventHandler('delete', null)

        expect(fixture.componentInstance.delete)
            .toHaveBeenCalledWith(HEROES[0]);
    });
    it(`should add a new Hero to hero list when add button is clicked`, () =>{
        const { mockHeroesService } = setupTestBed();
        mockHeroesService.getHeroes.and.returnValue(of(HEROES));
        const name = "Mr. Ice";
        mockHeroesService.addHero.and.returnValue(of({
            id: 5, name, strength: 4
        }));
        const { fixture } = createComponent();
        fixture.detectChanges();
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0]; 

        inputElement.value = name;
        addButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
        expect(heroText).toContain(name);
    });
    it(`should have the correct route for the first hero`, () => {
        const { mockHeroesService } = setupTestBed();
        mockHeroesService.getHeroes.and.returnValue(of(HEROES));
        const { fixture } = createComponent();
        fixture.detectChanges();
        const HeroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

        const routerLink = HeroComponents[0]
            // return a tag with the directive  
            .query(By.directive(RouterLinkDirectiveStub))
            // get in a tag the directive class
            .injector.get(RouterLinkDirectiveStub)

        HeroComponents[0].query(By.css('a')).triggerEventHandler('click', null);
        
        expect(routerLink.navigatedTo).toEqual('/detail/1')
    });
});
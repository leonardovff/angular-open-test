import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";

describe('HeroesComponent (shallow)', ()=> {
    const HEROES = [
        {id: 1, name: 'SpideDude', strength: 8},
        {id: 2, name: 'WOnderful Woman', strength: 24},
        {id: 3, name: 'SuperDude', strength: 55}
    ];
    const setupTestBed = () => {
        @Component({
            selector: 'app-hero',
            template: '<div></div>'
        })
        class FakeHeroComponent {
            @Input() hero: Hero
        }
        
        const mockHeroesService = jasmine.createSpyObj(['getHeroes']);
        
        TestBed.configureTestingModule({
            declarations: [HeroesComponent, FakeHeroComponent],
            providers: [{
                provide: HeroService, useValue: mockHeroesService
            }],
            schemas: [NO_ERRORS_SCHEMA]
        });
        return { mockHeroesService };
    }
    const createComponent = () => {
        const fixture: ComponentFixture<HeroesComponent> = TestBed.createComponent(
            HeroesComponent
        );
        return { fixture }
    }

    it('should get the heroes from heroesService', () => {
        const { mockHeroesService } = setupTestBed();
        mockHeroesService.getHeroes.and.returnValue(of(HEROES));
        const { fixture } = createComponent();

        const { componentInstance } = fixture;
        fixture.detectChanges();
        
        expect(componentInstance.heroes.length).toBe(3);
    });

    it('should show the heroes list', () => {
        const { mockHeroesService } = setupTestBed();
        mockHeroesService.getHeroes.and.returnValue(of(HEROES));
        const { fixture } = createComponent();

        const { componentInstance } = fixture;
        fixture.detectChanges();
        
        expect(fixture.debugElement.queryAll(By.css('li')).length).toEqual(3);
    });
});
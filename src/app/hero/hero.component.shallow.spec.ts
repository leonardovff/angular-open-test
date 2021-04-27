import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "./hero.component";

describe('HeroesComponent (shallow test)', () => {
    it('should render the hero name in a anchor tag', () => {
        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
        const fixture = TestBed.createComponent(
            HeroComponent
        ) as ComponentFixture<HeroComponent>;
        const { componentInstance, nativeElement} = fixture;
        
        componentInstance.hero = {id: 1, name: 'SuperDude', strength: 3};
        fixture.detectChanges();

        const deA = fixture.debugElement.query(By.css('a')); 
        expect(deA.nativeElement.textContent).toContain('SuperDude');
        // expect(nativeElement.querySelector('a').textContent).toContain('SuperDude');
    });
});
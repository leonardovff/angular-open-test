import { Location } from "@angular/common";
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component";

describe('HeroDetailComponent', () => {
    const setupTestBed = () => {
        const mockActivatedRoute = {
            snapshot: { paramMap: { get: () => 3}}
        }
        const mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        const mockLocation = jasmine.createSpyObj(['back']);
        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [ HeroDetailComponent ],
            providers: [
                {provide: ActivatedRoute, useValue: mockActivatedRoute},
                {provide: HeroService, useValue: mockHeroService},
                {provide: Location, useValue: mockLocation},
            ]
        });
        return { mockHeroService, mockLocation, mockActivatedRoute};
    }
    const createComponent = () => {
        const fixture: ComponentFixture<HeroDetailComponent> = TestBed.createComponent(HeroDetailComponent);
        return { fixture };
    }
    it('should render hero name in a h2 tag', () => {
        const { mockHeroService } = setupTestBed();
        mockHeroService.getHero.and.returnValue(of({
            id: 3, name: 'SuperDude', strength: 100
        }));
        const { fixture } = createComponent();

        fixture.detectChanges();
       
        const textTitle = fixture.debugElement.query(By.css('h2')).nativeElement.textContent;
        expect(textTitle).toContain('SUPERDUDE');

    });
    it('should call updateHero when save is called', fakeAsync(() => {
        const { mockHeroService } = setupTestBed();
        mockHeroService.getHero.and.returnValue(of({
            id: 3, name: 'SuperDude', strength: 100
        }));
        mockHeroService.updateHero.and.returnValue(of({}));
        const { fixture } = createComponent();
        fixture.detectChanges();

        fixture.componentInstance.save();
        flush();

        expect(mockHeroService.updateHero).toHaveBeenCalled();
    }));
    // it('should call updateHero when save is called', async(() => {
    //     const { mockHeroService } = setupTestBed();
    //     mockHeroService.getHero.and.returnValue(of({
    //         id: 3, name: 'SuperDude', strength: 100
    //     }));
    //     mockHeroService.updateHero.and.returnValue(of({}));
    //     const { fixture } = createComponent();
    //     fixture.detectChanges();

    //     fixture.componentInstance.save();
    //     fixture.whenStable().then(() => {
    //         expect(mockHeroService.updateHero).toHaveBeenCalled();
    //     });
    // }));
});
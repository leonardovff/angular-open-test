import { TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { inject } from "@angular/core/testing";

describe('HeroService', () => {
    const setupTestBed = () => {
        const mockMessageService = jasmine.createSpyObj(['add']);
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule],
            providers: [
                HeroService, 
                { provide: MessageService, useValue: mockMessageService }
            ]
        });
    }
    describe('getHero', () => {
        it('should call get with correct URL', () => {
            setupTestBed();
            const controller: HttpTestingController = TestBed.get(HttpTestingController);
            const service: HeroService = TestBed.get(HeroService);
            
            service.getHero(4).subscribe(() => {
                console.log('fulfilled');
            });
            // service.getHero(3).subscribe(() => {
            //     console.log('fulfilled');
            // });

            const req = controller.expectOne('api/heroes/4');
            req.flush({id: 4, name: 'SuperDude', strength: 100});
            controller.verify();
        });
    })
})
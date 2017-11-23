import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ShowSelectedFilesComponent} from './show-selected-files.component';

describe('ShowSelectedFilesComponent', () => {
    let component: ShowSelectedFilesComponent;
    let fixture: ComponentFixture<ShowSelectedFilesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShowSelectedFilesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShowSelectedFilesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

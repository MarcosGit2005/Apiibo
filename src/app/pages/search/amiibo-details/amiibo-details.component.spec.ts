import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmiiboDetailsComponent } from './amiibo-details.component';

describe('AmiiboDetailsComponent', () => {
  let component: AmiiboDetailsComponent;
  let fixture: ComponentFixture<AmiiboDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AmiiboDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmiiboDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

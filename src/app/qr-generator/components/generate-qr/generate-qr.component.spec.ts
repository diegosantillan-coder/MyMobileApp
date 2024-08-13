import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { IonicModule } from '@ionic/angular'

import { GenerateQrComponent } from './generate-qr.component'

describe('GenerateQrComponent', () => {
  let component: GenerateQrComponent
  let fixture: ComponentFixture<GenerateQrComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateQrComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents()

    fixture = TestBed.createComponent(GenerateQrComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

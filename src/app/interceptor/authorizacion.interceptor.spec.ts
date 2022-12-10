import { TestBed } from '@angular/core/testing';

import { AuthorizacionInterceptor } from './authorizacion.interceptor';

describe('AuthorizacionInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthorizacionInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthorizacionInterceptor = TestBed.inject(AuthorizacionInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

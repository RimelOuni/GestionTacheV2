import { TestBed } from '@angular/core/testing';

import { AuthEmpGuard } from './auth-emp.guard';

describe('AuthEmpGuard', () => {
  let guard: AuthEmpGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthEmpGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

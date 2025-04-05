import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { from, map, Observable } from 'rxjs';
import { TodoInterface } from '../types/todo.interace';
import { Database } from '../types/database.types';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private supabase: SupabaseClient = createClient<Database>(
    environment.supabaseUrl,
    environment.supabaseKey
  );

  getTodos(userId: string): Observable<TodoInterface[]> {
    const promise = this.supabase
      .from('Todos')
      .select('*')
      .eq('userId', userId);
    return from(promise).pipe(
      map((response) => {
        return response.data ?? [];
      })
    );
  }
}

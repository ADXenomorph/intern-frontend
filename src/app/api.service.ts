import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  public loadUsers() {
    return this.http.get('/api/users');
  }

  public upsertUser(id, firstName, lastName) {
    return this.http.post('/api/users', {user_id: id, first_name: firstName, last_name: lastName});
  }

  public deleteUser(id) {
    return this.http.delete('/api/users/' + id);
  }

  public loadOrders() {
    return this.http.get('/api/orders');
  }

  public upsertOrder(id, userId, itemName) {
    return this.http.post('/api/orders', {order_id: id, user_id: userId, item_name: itemName});
  }

  public deleteOrder(id) {
    return this.http.delete('/api/orders/' + id);
  }
}

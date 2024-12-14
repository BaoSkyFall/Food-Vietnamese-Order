import 'package:flutter/material.dart';
import '../models/order.dart';
import '../services/order_service.dart';
import 'status_badge.dart';
import 'package:intl/intl.dart';

class OrderCard extends StatelessWidget {
  final Order order;
  final VoidCallback onTap;
  final VoidCallback onDelete;

  const OrderCard({
    Key? key,
    required this.order,
    required this.onTap,
    required this.onDelete,
  }) : super(key: key);

  Future<void> _showDeleteConfirmation(BuildContext context) async {
    return showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Xác nhận xóa'),
          content: Text('Bạn có chắc chắn muốn xóa đơn hàng này không?'),
          actions: <Widget>[
            TextButton(
              child: Text('Hủy'),
              onPressed: () => Navigator.of(context).pop(),
            ),
            TextButton(
              child: Text(
                'Xóa',
                style: TextStyle(color: Colors.red),
              ),
              onPressed: () {
                Navigator.of(context).pop();
                onDelete();
              },
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final dateFormat = DateFormat('dd/MM/yyyy HH:mm');
    final formattedDate = dateFormat.format(order.orderDate);
    final priceFormat = NumberFormat('#,###');
    final formattedTotal = priceFormat.format(order.total);

    return Card(
      margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Stack(
        children: [
          InkWell(
            onTap: () async {
              print('Navigating to order details with ID: ${order.id}');
              final result = await Navigator.pushNamed(
                context,
                '/order-details',
                arguments: order.id,
              );
              if (result == true) {
                onTap();
              }
            },
            child: Padding(
              padding: EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Mã Đơn #${order.id.substring(order.id.length - 4, order.id.length).toUpperCase()}',
                        style: Theme.of(context).textTheme.titleLarge,
                        
                      ),
                      Icon(Icons.chevron_right),
                    ],
                  ),
                  SizedBox(height: 8),
                  Row(
                    children: [
                      
                      StatusBadge(status: order.status),
                    ],
                  ),
                  Text('Ngày Đặt: $formattedDate'),
                  Text('Tổng Tiền: ${formattedTotal}₫'),
                  Text('Khách Hàng: ${order.customerInfo.name}'),
                ],
              ),
            ),
          ),
          Positioned(
            right: 8,
            bottom: 8,
            child: IconButton(
              icon: Icon(Icons.delete, color: Colors.red),
              onPressed: () => _showDeleteConfirmation(context),
            ),
          ),
        ],
      ),
    );
  }
}

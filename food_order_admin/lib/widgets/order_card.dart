import 'package:flutter/material.dart';
import '../models/order.dart';
import 'package:intl/intl.dart';

class OrderCard extends StatelessWidget {
  final Order order;
  final VoidCallback onTap;

  const OrderCard({
    Key? key,
    required this.order,
    required this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final dateFormat = DateFormat('dd/MM/yyyy HH:mm');
    final formattedDate = dateFormat.format(order.orderDate);
    
    final priceFormat = NumberFormat('#,###');
    final formattedTotal = priceFormat.format(order.total);

    return Card(
      margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: InkWell(
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
                    'Order #${order.id}',
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  Icon(Icons.chevron_right),
                ],
              ),
              SizedBox(height: 8),
              Text('Status: ${order.status}'),
              Text('Date: $formattedDate'),
              Text('Total: ${formattedTotal}₫'),
              Text('Customer: ${order.customerInfo.name}'),
            ],
          ),
        ),
      ),
    );
  }
}
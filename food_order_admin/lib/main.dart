import 'package:flutter/material.dart';
import 'screens/auth/login_screen.dart';
import 'screens/auth/register_screen.dart';
import 'screens/orders/order_list_screen.dart';
import 'screens/orders/order_details_screen.dart';
import 'config/theme_config.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Food Order Admin',
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      initialRoute: '/login',
      routes: {
        '/': (context) => LoginScreen(),
        '/login': (context) => LoginScreen(),
        '/register': (context) => RegisterScreen(),
        '/orders': (context) => OrdersListScreen(),
      },
      onGenerateRoute: (settings) {
        print('Generating route for ${settings.name} with args: ${settings.arguments}');
        
        if (settings.name == '/order-details') {
          final orderId = settings.arguments as String;
          return MaterialPageRoute(
            builder: (context) => OrderDetailsScreen(orderId: orderId),
          );
        }
        return null;
      },
      onUnknownRoute: (settings) {
        return MaterialPageRoute(
          builder: (context) => Scaffold(
            body: Center(
              child: Text('Route ${settings.name} not found'),
            ),
          ),
        );
      },
    );
  }
}
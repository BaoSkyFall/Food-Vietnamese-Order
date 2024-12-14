import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-orange-800 text-orange-50 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Bếp Việt Catering</h2>
          <p className="text-orange-200 mb-4">Authentic Vietnamese Cuisine</p>
          <div className="border-t border-orange-700 pt-4 mt-4">
            <p className="text-sm text-orange-300">
              © {new Date().getFullYear()} Bếp Việt Catering. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
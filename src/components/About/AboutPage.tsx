import React from 'react';
import { Heart, Shield, Truck, Award, Users, Star } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Mohini Undergarments</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          For over a decade, we've been dedicated to providing women with the finest intimate wear 
          that combines comfort, elegance, and confidence. Our mission is to help every woman feel 
          beautiful and empowered in her own skin.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Founded in 2010, Mohini Undergarments began as a small family business with a simple 
              vision: to create intimate wear that doesn't compromise on comfort or style. What started 
              as a local boutique has grown into a trusted brand serving thousands of women across the country.
            </p>
            <p>
              We understand that the right intimate wear is more than just clothing—it's about confidence, 
              comfort, and feeling your best every day. That's why we carefully select premium materials 
              and work with skilled artisans to create pieces that meet the highest standards of quality.
            </p>
            <p>
              Today, we're proud to offer a comprehensive range of bras, panties, and specialty items 
              designed for the modern woman's lifestyle. Whether you're looking for everyday essentials 
              or something special, we have the perfect fit for you.
            </p>
          </div>
        </div>
        <div className="relative">
          <img
            src="https://images.pexels.com/photos/7679725/pexels-photo-7679725.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="About us"
            className="rounded-lg shadow-lg w-full h-96 object-cover"
          />
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-pink-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Comfort First</h3>
            <p className="text-gray-600">
              Every piece is designed with your comfort in mind, using the softest, most breathable materials.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Assured</h3>
            <p className="text-gray-600">
              We maintain strict quality standards to ensure every product meets our high expectations.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Quick and discreet shipping to get your orders to you as soon as possible.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
            <p className="text-gray-600">
              We strive for excellence in everything we do, from product design to customer service.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
            <div className="text-gray-700">Happy Customers</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-700">Products Available</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">4.9★</div>
            <div className="text-gray-700">Average Rating</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
            <div className="text-gray-700">Years Experience</div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          To empower women by providing them with intimate wear that enhances their confidence and comfort. 
          We believe that every woman deserves to feel beautiful, supported, and confident in her choices. 
          Through our carefully curated collection and exceptional customer service, we aim to be your 
          trusted partner in feeling your absolute best.
        </p>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 rounded-lg p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Experience the Difference</h2>
        <p className="text-xl mb-6 opacity-90">
          Join thousands of women who trust Mohini for their intimate wear needs.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Shop Our Collection
        </button>
      </div>
    </div>
  );
};

export default AboutPage;
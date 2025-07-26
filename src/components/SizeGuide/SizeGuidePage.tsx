import React, { useState } from 'react';
import { ArrowLeft, Ruler, Info, CheckCircle } from 'lucide-react';

interface SizeGuidePageProps {
  onNavigate: (page: string) => void;
}

const SizeGuidePage: React.FC<SizeGuidePageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('bra');

  const braGuide = {
    sizes: [
      { band: '30', cups: ['A', 'B', 'C', 'D', 'DD'] },
      { band: '32', cups: ['A', 'B', 'C', 'D', 'DD', 'DDD'] },
      { band: '34', cups: ['A', 'B', 'C', 'D', 'DD', 'DDD'] },
      { band: '36', cups: ['A', 'B', 'C', 'D', 'DD', 'DDD'] },
      { band: '38', cups: ['A', 'B', 'C', 'D', 'DD', 'DDD'] },
      { band: '40', cups: ['A', 'B', 'C', 'D', 'DD'] },
    ],
    measurements: [
      { size: '30A', band: '26-28"', bust: '30-31"' },
      { size: '32A', band: '28-30"', bust: '32-33"' },
      { size: '34A', band: '30-32"', bust: '34-35"' },
      { size: '36A', band: '32-34"', bust: '36-37"' },
      { size: '38A', band: '34-36"', bust: '38-39"' },
      { size: '32B', band: '28-30"', bust: '33-34"' },
      { size: '34B', band: '30-32"', bust: '35-36"' },
      { size: '36B', band: '32-34"', bust: '37-38"' },
      { size: '38B', band: '34-36"', bust: '39-40"' },
      { size: '32C', band: '28-30"', bust: '34-35"' },
      { size: '34C', band: '30-32"', bust: '36-37"' },
      { size: '36C', band: '32-34"', bust: '38-39"' },
      { size: '38C', band: '34-36"', bust: '40-41"' },
    ]
  };

  const pantiesGuide = {
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    measurements: [
      { size: 'XS', waist: '24-26"', hips: '34-36"' },
      { size: 'S', waist: '26-28"', hips: '36-38"' },
      { size: 'M', waist: '28-30"', hips: '38-40"' },
      { size: 'L', waist: '30-32"', hips: '40-42"' },
      { size: 'XL', waist: '32-34"', hips: '42-44"' },
      { size: 'XXL', waist: '34-36"', hips: '44-46"' },
    ]
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => onNavigate('home')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors mr-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Size Guide</h1>
          <p className="text-gray-600 mt-1">Find your perfect fit with our comprehensive sizing guide</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 max-w-md">
        <button
          onClick={() => setActiveCategory('bra')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeCategory === 'bra'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Bras
        </button>
        <button
          onClick={() => setActiveCategory('panties')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeCategory === 'panties'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Panties
        </button>
      </div>

      {/* How to Measure Section */}
      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
          <Ruler className="h-5 w-5 mr-2" />
          How to Measure
        </h2>
        
        {activeCategory === 'bra' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-blue-800 mb-2">Band Size</h3>
              <p className="text-blue-700 text-sm">
                Measure around your ribcage, just under your bust. Keep the tape measure level and snug but not tight.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-blue-800 mb-2">Cup Size</h3>
              <p className="text-blue-700 text-sm">
                Measure around the fullest part of your bust. The difference between this and your band measurement determines your cup size.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-blue-800 mb-2">Waist</h3>
              <p className="text-blue-700 text-sm">
                Measure around the narrowest part of your waist, typically just above your belly button.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-blue-800 mb-2">Hips</h3>
              <p className="text-blue-700 text-sm">
                Measure around the fullest part of your hips, typically 7-9 inches below your waist.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Size Charts */}
      {activeCategory === 'bra' ? (
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Bra Size Chart</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Band (inches)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bust (inches)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {braGuide.measurements.map((measurement, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {measurement.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {measurement.band}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {measurement.bust}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Panties Size Chart</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waist (inches)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hips (inches)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pantiesGuide.measurements.map((measurement, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {measurement.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {measurement.waist}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {measurement.hips}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Fit Tips */}
      <div className="bg-amber-50 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center">
          <Info className="h-5 w-5 mr-2" />
          Fit Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-amber-800 text-sm">
              If you're between sizes, we recommend sizing up for comfort
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-amber-800 text-sm">
              Consider your preferred fit - some prefer snug, others prefer loose
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-amber-800 text-sm">
              Measure yourself regularly as sizes can change over time
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-amber-800 text-sm">
              Contact us if you need help choosing the right size
            </p>
          </div>
        </div>
      </div>

      {/* Contact for Help */}
      <div className="text-center mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Still Need Help?</h3>
        <p className="text-gray-600 mb-4">
          Our sizing experts are here to help you find the perfect fit
        </p>
        <button
          onClick={() => onNavigate('contact')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default SizeGuidePage;
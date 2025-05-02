import React from 'react'
import bgImage from '../assets/fotoaptek.jpg'
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat animate-backgroundMove"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="backdrop-brightness-90 min-h-screen w-full">
          <div className="max-w-6xl mx-auto text-center px-4 md:px-6 pt-52">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-md">
              Selamat Datang di <span className="text-blue-600">e-Apotek</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white drop-shadow">
              Platform apotek digital yang memudahkan Anda membeli obat dan konsultasi dengan apoteker profesional.
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm shadow-md transition">
                Lihat Produk
              </button>
              <button className="border border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-xl text-sm shadow-sm transition">
                Hubungi Kami
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Kenapa Memilih Kami Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-600">
            Kenapa Memilih <span className="text-gray-800">e-Apotek?</span>
          </h2>
          <p className="text-gray-600 text-lg mb-12">
            Kami menghadirkan solusi kesehatan terpercaya untuk keluarga Anda dengan fitur terbaik.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Akses Mudah</h3>
              <p className="text-gray-600">Belanja obat dan konsultasi apoteker cukup dari rumah Anda.</p>
            </div>
            <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Konsultasi Profesional</h3>
              <p className="text-gray-600">Tim apoteker kami siap membantu menjawab kebutuhan kesehatan Anda.</p>
            </div>
            <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Pengiriman Cepat</h3>
              <p className="text-gray-600">Layanan pengiriman cepat dan aman langsung ke rumah Anda.</p>
            </div>
          </div>
        </div>
      </section>

        {/* Section: Testimoni */}
        <section className="bg-blue-50 py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-blue-600">
            Apa Kata Pengguna Kami?
            </h2>
            <div className="grid md:grid-cols-2 gap-12 text-left">
            {/* Testimoni 1 */}
            <div className="flex items-start gap-4">
                <img src="/user1.jpg" alt="User 1" className="w-16 h-16 rounded-full object-cover" />
                <div>
                <p className="text-gray-700 text-base mb-2">
                    “Layanan e-Apotek sangat memudahkan saya membeli obat tanpa harus keluar rumah. Prosesnya cepat dan apotekernya ramah!”
                </p>
                <p className="text-sm font-semibold text-blue-600">– Siti, Jakarta</p>
                </div>
            </div>

            {/* Testimoni 2 */}
            <div className="flex items-start gap-4">
                <img src="/user2.jpg" alt="User 2" className="w-16 h-16 rounded-full object-cover" />
                <div>
                <p className="text-gray-700 text-base mb-2">
                    “Konsultasi langsung dengan apoteker online bikin saya merasa aman sebelum konsumsi obat. Praktis banget!”
                </p>
                <p className="text-sm font-semibold text-blue-600">– Andi, Surabaya</p>
                </div>
            </div>
            </div>
        </div>
        </section>
        
        {/* Footer*/}
        <section className="bg-blue-600 text-white py-12 mt-20">
            <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Kolom 1: Logo & Deskripsi */}
                <div>
                <h3 className="text-xl font-bold mb-4">e-Apotek</h3>
                <p className="text-sm leading-relaxed">
                    Platform apotek digital terpercaya yang siap membantu Anda memenuhi kebutuhan kesehatan secara online.
                </p>
                </div>

                {/* Kolom 2: Info Kontak */}
                <div>
                <h4 className="text-lg font-semibold mb-4">Kontak Kami</h4>
                <ul className="text-sm space-y-2">
                    <li>📍 Jl. Kesehatan No.10, Jakarta</li>
                    <li>📞 (021) 123-4567</li>
                    <li>✉️ info@eapotek.com</li>
                </ul>
                </div>

                {/* Kolom 3: Sosial Media */}
                <div>
                <h4 className="text-lg font-semibold mb-4">Ikuti Kami</h4>
                <ul className="text-sm space-y-3">
                    <li className="flex items-center gap-2">
                    <FaInstagram className="text-white" /> 
                    <a href="#" className="hover:underline">Instagram</a>
                    </li>
                    <li className="flex items-center gap-2">
                    <FaFacebookF className="text-white" />
                    <a href="#" className="hover:underline">Facebook</a>
                    </li>
                    <li className="flex items-center gap-2">
                    <FaTwitter className="text-white" />
                    <a href="#" className="hover:underline">Twitter</a>
                    </li>
                </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-xs text-blue-100 mt-10">
                &copy; {new Date().getFullYear()} e-Apotek. All rights reserved.
            </div>
        </section>
    </>
        
  )
}

export default Home

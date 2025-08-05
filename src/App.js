import React, { useState, useEffect, useRef, useCallback } from 'react';

// Main App component for the portfolio
const App = () => {
  // State to manage the currently active section for navigation
  const [activeSection, setActiveSection] = useState('home');
  // State to control the transition overlay visibility
  const [isTransitioning, setIsTransitioning] = useState(false);
  // State to manage the visibility of the project detail modal
  const [showProjectModal, setShowProjectModal] = useState(false);
  // State to hold the data for the currently selected project
  const [selectedProject, setSelectedProject] = useState(null);

  // Ref for the main content area to apply overflow hidden during transitions
  const contentRef = useRef(null);

  // HTML content for the resume page
  const resumeHtmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ayush Singh - Resume</title>
        <!-- Tailwind CSS CDN -->
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
        <style>
            body {
                font-family: 'Inter', sans-serif;
                background-color: #1a202c; /* Dark background */
                color: #e2e8f0; /* Light text color */
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 900px;
            }
            h1, h2, h3, h4 {
                color: #6366f1; /* Indigo for headings */
            }
            .section-divider {
                border-top: 2px solid #4a5568; /* Darker gray line */
                margin-top: 2rem;
                margin-bottom: 2rem;
            }
            ul {
                list-style-type: disc;
                margin-left: 1.25rem; /* Equivalent to pl-5 */
            }
            ul li {
                margin-bottom: 0.5rem;
            }
            .section-content ul li {
                list-style-type: disc;
                margin-left: 1.25rem;
                margin-bottom: 0.5rem;
            }
            .section-content ul.no-disc {
                list-style-type: none;
                margin-left: 0;
            }
        </style>
    </head>
    <body class="antialiased">
        <div class="container mx-auto p-6 md:p-10 bg-gray-900 shadow-lg rounded-lg my-8">

            <!-- Header Section -->
            <header class="text-center mb-8">
                <h1 class="text-4xl font-extrabold mb-2">AYUSH SINGH</h1>
                <p class="text-lg text-gray-400">Lucknow, India | 7007031330 | <a href="mailto:Ayu.rajput0123@gmail.com" class="text-indigo-400 hover:underline">Ayu.rajput0123@gmail.com</a></p>
                <p class="text-lg text-gray-400">
                    <a href="[LinkedIn Profile URL - Highly Recommended]" class="text-indigo-400 hover:underline" target="_blank">LinkedIn Profile</a> |
                    <a href="[GitHub Profile URL - Highly Recommended]" class="text-indigo-400 hover:underline" target="_blank">GitHub Profile</a>
                </p>
            </header>

            <hr class="section-divider">

            <!-- Profile Summary Section -->
            <section class="mb-8">
                <h2 class="text-3xl font-bold mb-4">PROFILE SUMMARY</h2>
                <p class="text-gray-300 leading-relaxed">
                    Highly passionate and results-driven Computer Science student at Babu Banarasi Das University (BBDU) specializing in Internet of Things (IoT) and Blockchain, with an IBM specialization. Proficient in Python, Java, and Web Development. Eager to leverage strong technical skills in cybersecurity, blockchain development, and AI/ML to contribute to innovative tech solutions and solve real-world challenges in a dynamic internship environment.
                </p>
            </section>

            <hr class="section-divider">

            <!-- Education Section -->
            <section class="mb-8">
                <h2 class="text-3xl font-bold mb-4">EDUCATION</h2>
                <div class="mb-4">
                    <h3 class="text-xl font-semibold text-white">Bachelor of Technology in Computer Science Engineering (IoT & Blockchain with IBM Specialization)</h3>
                    <p class="text-gray-400">Babu Banarasi Das University (BBDU), Lucknow, India</p>
                    <p class="text-gray-400"><em>Expected Graduation: January 2027 | Start Date: January 2023</em></p>
                </div>
            </section>

            <hr class="section-divider">

            <!-- Employment History Section -->
            <section class="mb-8">
                <h2 class="text-3xl font-bold mb-4">EMPLOYMENT HISTORY</h2>
                <div class="mb-6">
                    <h3 class="text-xl font-semibold text-white">Internship, AICTE TechSaitsham</h3>
                    <p class="text-gray-400">Nov 2024 – Present</p>
                    <ul class="list-disc list-inside text-gray-300 mt-2">
                        <li>**Applied AI technologies (e.g., Python, TensorFlow)** to develop a prototype for **AI-driven learning recommendations**, achieving **85% accuracy** in predicting user learning paths.</li>
                        <li>**Designed, developed, and presented an independent project on "Transformative Learning with AI"** to a panel of **5 industry experts**, demonstrating the practical application of AI concepts and **receiving commendation for its potential to improve learning efficiency by 20%**.</li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-xl font-semibold text-white">Intern, Cognifyz</h3>
                    <p class="text-gray-400">Oct 2024 – Nov 2024</p>
                    <ul class="list-disc list-inside text-gray-300 mt-2">
                        <li>**Engineered and maintained 3 responsive websites** using HTML, CSS, and JavaScript, ensuring full mobile responsiveness and cross-browser compatibility.</li>
                        <li>**Collaborated with a 4-person cross-functional team** to implement user-centric UI/UX designs, **resulting in a 15% increase in user engagement** (e.g., measured by click-through rates on key features).</li>
                        <li>**Optimized website performance**, leading to a **10% reduction in page load times** across key landing pages.</li>
                    </ul>
                </div>
            </section>

            <hr class="section-divider">

            <!-- Projects Section -->
            <section class="mb-8">
                <h2 class="text-3xl font-bold mb-4">PROJECTS</h2>
                <div class="mb-6">
                    <h3 class="text-xl font-semibold text-white">CHATBOT Implementation</h3>
                    <ul class="list-disc list-inside text-gray-300 mt-2">
                        <li>**Developed and implemented a conversational AI chatbot** utilizing Natural Language Processing (NLP) techniques.</li>
                        <li>Designed and integrated logical flows to provide efficient and accurate responses to user queries.</li>
                    </ul>
                </div>
                <div class="mb-6">
                    <h3 class="text-xl font-semibold text-white">Biometric Attendance System</h3>
                    <ul class="list-disc list-inside text-gray-300 mt-2">
                        <li>**Designed and implemented a fingerprint-based biometric attendance system.**</li>
                        <li>Integrated hardware components with software logic to ensure secure and automated attendance tracking.</li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-xl font-semibold text-white">The Third Eye</h3>
                    <ul class="list-disc list-inside text-gray-300 mt-2">
                        <li>**Engineered an innovative system, "The Third Eye,"** focusing on [**Expand on the specific purpose and impact, e.g., enhanced surveillance, real-time monitoring, security threat detection**].</li>
                        <li>[**Add 1-2 bullet points detailing specific features or technologies used, e.g., "Utilized computer vision for object detection," "Integrated with sensor networks for data collection."**]</li>
                    </ul>
                </div>
            </section>

            <hr class="section-divider">

            <!-- Skills Section -->
            <section class="mb-8">
                <h2 class="text-3xl font-bold mb-4">SKILLS</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300 section-content">
                    <div>
                        <h4 class="text-xl font-semibold text-indigo-300 mb-2">Languages:</h4>
                        <ul class="no-disc">
                            <li>Python</li>
                            <li>Java</li>
                            <li>JavaScript</li>
                            <li>HTML</li>
                            <li>CSS</li>
                            <li>C/C++</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-xl font-semibold text-indigo-300 mb-2">Web Technologies:</h4>
                        <ul class="no-disc">
                            <li>React.js</li>
                            <li>Node.js</li>
                            <li>Express.js</li>
                            <li>TailwindCSS</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-xl font-semibold text-indigo-300 mb-2">Databases:</h4>
                        <ul class="no-disc">
                            <li>MongoDB</li>
                            <li>MySQL</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-xl font-semibold text-indigo-300 mb-2">Cloud Platforms:</h4>
                        <ul class="no-disc">
                            <li>AWS (S3, EC2)</li>
                            <li>Azure</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-xl font-semibold text-indigo-300 mb-2">Cybersecurity:</h4>
                        <ul class="no-disc">
                            <li>Ethical Hacking</li>
                            <li>Penetration Testing</li>
                            <li>Network Security</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-xl font-semibold text-indigo-300 mb-2">Blockchain:</h4>
                        <ul class="no-disc">
                            <li>Ethereum</li>
                            <li>Solidity</li>
                            <li>Hyperledger Fabric</li>
                            <li>Truffle</li>
                            <li>Hardhat</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-xl font-semibold text-indigo-300 mb-2">IoT:</h4>
                        <ul class="no-disc">
                            <li>Arduino</li>
                            <li>Raspberry Pi</li>
                            <li>ESP32</li>
                            <li>MQTT</li>
                            <li>CoAP</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-xl font-semibold text-indigo-300 mb-2">AI/ML:</h4>
                        <ul class="no-disc">
                            <li>Natural Language Processing (NLP)</li>
                            <li>TensorFlow</li>
                            <li>Keras</li>
                            <li>PyTorch</li>
                            <li>scikit-learn</li>
                            <li>NLTK</li>
                            <li>OpenCV</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-xl font-semibold text-indigo-300 mb-2">Tools & Technologies:</h4>
                        <ul class="no-disc">
                            <li>VS Code</li>
                            <li>Postman</li>
                            <li>GitHub</li>
                            <li>Jenkins</li>
                            <li>Prometheus</li>
                            <li>Helm</li>
                        </ul>
                    </div>
                </div>
            </section>

            <hr class="section-divider">

            <!-- Certifications & Achievements Section -->
            <section class="mb-8">
                <h2 class="text-3xl font-bold mb-4">CERTIFICATIONS & ACHIEVEMENTS</h2>
                <ul class="list-disc list-inside text-gray-300">
                    <li>Web Development Basics - IBM SkillsBuild</li>
                    <li>Data Visualization with Python - Cognitive Class (IBM)</li>
                    <li>Cybersecurity Analyst Job Simulation - Forage</li>
                    <li>Google Cloud Digital Leader</li>
                    <li>CompTIA Security+</li>
                    <li>Introduction to Blockchain (Coursera)</li>
                    <li>Cloud Computing Fundamentals</li>
                    <li>Blockchain Basics</li>
                    <li>Introduction to Machine Learning</li>
                    <li>Network Security Professional</li>
                </ul>
            </section>

            <hr class="section-divider">

            <!-- Languages Section -->
            <section>
                <h2 class="text-3xl font-bold mb-4">LANGUAGES</h2>
                <ul class="list-disc list-inside text-gray-300">
                    <li>English (Fluent)</li>
                    <li>Hindi (Native)</li>
                </ul>
            </section>

        </div>
    </body>
    </html>
  `;

  // Project data - replace with your actual projects
  const projects = [
    {
      id: 'project1',
      title: 'Chatbot Implementation (NLP)',
      category: 'AI/ML, Web Development',
      image: 'https://placehold.co/600x400/1e293b/cbd5e1?text=Chatbot+Project',
      description: 'Developed and implemented a chatbot using Natural Language Processing (NLP) techniques.',
      details: 'This project focused on creating an intelligent chatbot capable of understanding and responding to user queries using NLP. It involved designing conversational flows, integrating with backend services, and ensuring a smooth user experience. This showcases proficiency in NLP and web development.',
      technologies: ['Python', 'NLP', 'JavaScript', 'Web Development']
    },
    {
      id: 'project2',
      title: 'Fingerprint-Based Biometric Attendance System',
      category: 'IoT, Security',
      image: 'https://placehold.co/600x400/1e293b/cbd5e1?text=Biometric+System',
      description: 'Designed and implemented a fingerprint-based biometric attendance system.',
      details: 'This project involved hardware-software integration for a secure and efficient attendance system. It utilized fingerprint scanning technology to authenticate users and record attendance, demonstrating skills in IoT, system design, and data management.',
      technologies: ['Java', 'IoT', 'Hardware Integration', 'Database Management']
    },
    {
      id: 'project3',
      title: 'AICTE TechSaitsham Internship Project',
      category: 'AI, Independent Project',
      image: 'https://placehold.co/600x400/1e293b/cbd5e1?text=AICTE+Internship',
      description: 'Gained hands-on experience in AI technologies and completed an independent project on Transformative Learning.',
      details: 'During this internship, I delved into various AI technologies and applied them to a practical project focused on transformative learning. The project was presented to industry experts, showcasing my ability to apply theoretical knowledge to real-world scenarios and communicate technical concepts effectively.',
      technologies: ['AI', 'Machine Learning', 'Microsoft Technologies', 'SAP']
    },
    {
      id: 'project4',
      title: 'Cognifyz Web Development Internship',
      category: 'Web Development, UI/UX',
      image: 'https://placehold.co/600x400/1e293b/cbd5e1?text=Cognifyz+Internship',
      description: 'Developed and maintained responsive websites, enhancing user engagement through UI/UX design.',
      details: 'As an intern at Cognifyz, I was responsible for developing and maintaining responsive websites using core web technologies. I collaborated with cross-functional teams to implement user-centric UI/UX designs, significantly enhancing user engagement and overall site performance. This experience honed my skills in front-end development and collaborative project execution.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'UI/UX']
    },
    {
      id: 'project5',
      title: 'The Third Eye',
      category: 'Security, Innovation',
      image: 'https://placehold.co/600x400/1e293b/cbd5e1?text=The+Third+Eye',
      description: 'An innovative project focused on enhancing security or surveillance.',
      details: 'This project, "The Third Eye," explored advanced concepts in security and surveillance, likely involving [You can expand this based on what "The Third Eye" entails, e.g., computer vision, sensor networks, data analysis for threat detection]. It represents my interest in applying technology to real-world security challenges.',
      technologies: ['[Specific technologies if known, e.g., OpenCV, Python, IoT, Network Security]']
    },
    // New Projects Added Below
    {
      id: 'project6',
      title: 'Blockchain-based Secure Voting System',
      category: 'Blockchain, Cybersecurity',
      image: 'https://placehold.co/600x400/2c3e50/ecf0f1?text=Blockchain+Voting',
      description: 'Conceptualized and designed a secure, transparent, and immutable voting system leveraging blockchain technology.',
      details: 'This project aims to demonstrate the power of decentralized ledgers for critical applications like elections. It would involve developing smart contracts for voter registration, vote casting, and tallying, ensuring data integrity and preventing fraud. The system would provide a verifiable audit trail, enhancing trust in the electoral process. Focus areas include cryptography, distributed consensus, and user identity management on the blockchain.',
      technologies: ['Ethereum', 'Solidity', 'React.js', 'Node.js', 'Web3.js', 'Cryptography']
    },
    {
      id: 'project7',
      title: 'IoT-Enabled Smart Security System with Cloud AI',
      category: 'IoT, AI/ML, Cloud',
      image: 'https://placehold.co/600x400/34495e/ecf0f1?text=IoT+Security',
      description: 'Proposed and designed an intelligent IoT security system with real-time anomaly detection via cloud-based AI.',
      details: 'This project integrates various IoT sensors (e.g., motion, sound, door sensors) to monitor an environment. Data from these sensors would be streamed securely to a cloud platform (AWS IoT Core/Azure IoT Hub). Cloud functions would process this data, applying machine learning algorithms to detect unusual patterns or potential security breaches. Alerts would be triggered automatically to administrators. This project showcases end-to-end IoT system design, cloud architecture, and practical AI application in security.',
      technologies: ['Raspberry Pi/Arduino', 'MQTT', 'AWS IoT Core/Azure IoT Hub', 'AWS Lambda/Azure Functions', 'Python', 'Machine Learning', 'React.js (Dashboard)']
    },
    {
      id: 'project8',
      title: 'Automated Web Vulnerability Scanner (Python)',
      category: 'Cybersecurity, Scripting',
      image: 'https://placehold.co/600x400/1abc9c/ecf0f1?text=Vuln+Scanner',
      description: 'Developed a Python-based tool to automatically scan web applications for common security vulnerabilities.',
      details: 'This project focuses on identifying potential weaknesses in web applications, such as Cross-Site Scripting (XSS), SQL Injection, and Directory Traversal. The tool would analyze HTTP responses and input fields for common patterns indicative of vulnerabilities. It would generate a report detailing the findings, helping developers and security professionals identify and mitigate risks. This demonstrates a strong understanding of web security principles and practical scripting for penetration testing.',
      technologies: ['Python', 'requests', 'BeautifulSoup', 'Regular Expressions', 'Web Security Concepts']
    },
    {
      id: 'project9',
      title: 'Decentralized Application (dApp) for Digital Asset Management',
      category: 'Blockchain, Web Development',
      image: 'https://placehold.co/600x400/9b59b6/ecf0f1?text=dApp+Assets',
      description: 'Designed a decentralized application (dApp) for secure creation and management of digital assets (e.g., NFTs or custom tokens).',
      details: 'This project explores the development of a user-friendly dApp interface built on a blockchain platform. Users would be able to mint unique digital tokens (ERC-721 or ERC-1155 standards), view their owned assets, and securely transfer them. The dApp would interact directly with smart contracts, ensuring transparency and immutability of asset ownership. This project highlights expertise in smart contract development, frontend blockchain integration, and the growing field of Web3.',
      technologies: ['Ethereum', 'Solidity', 'Web3.js/Ethers.js', 'React.js', 'MetaMask', 'ERC-721/ERC-1155']
    }
  ];

  // Function to handle navigation between sections with a transition
  const handleNavigate = useCallback((sectionId) => {
    setIsTransitioning(true);
    if (contentRef.current) {
      contentRef.current.style.overflow = 'hidden'; // Prevent scrolling during transition
    }

    // Simulate a delay for the transition effect
    setTimeout(() => {
      setActiveSection(sectionId);
      // Scroll to the top of the new section smoothly
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      setIsTransitioning(false);
      if (contentRef.current) {
        contentRef.current.style.overflow = 'auto'; // Restore scrolling after transition
      }
    }, 800); // Adjust this duration to match your CSS transition duration
  }, []);

  // Effect to handle scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up-visible');
          } else {
            // Optional: remove class when out of view if you want re-animation on scroll back
            // entry.target.classList.remove('fade-in-up-visible');
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    // Observe elements that should animate
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect(); // Clean up observer on unmount
  }, [activeSection]); // Re-run observer when activeSection changes to ensure new content is observed

  // Function to open project detail modal
  const openProjectModal = (project) => {
    setSelectedProject(project);
    setShowProjectModal(true);
  };

  // Function to close project detail modal
  const closeProjectModal = () => {
    setShowProjectModal(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-inter relative overflow-hidden">
      {/* Tailwind CSS CDN for styling */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Custom CSS for transitions and animations */}
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

        body {
          font-family: 'Inter', sans-serif;
        }

        /* Page Transition Overlay */
        .transition-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #1e293b; /* Dark slate blue */
          transform: translateX(-100%);
          transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1); /* Ease-out cubic-bezier */
          z-index: 50;
        }

        .transition-overlay.active {
          transform: translateX(0);
        }

        .transition-overlay.active-out {
          transform: translateX(100%);
        }

        /* Scroll-triggered animation */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .fade-in-up-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Project Card Hover Effect */
        .project-card {
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }

        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
        }

        /* Project Modal Transition */
        .modal-overlay {
          transition: opacity 0.3s ease-out;
        }

        .modal-content {
          transition: transform 0.3s ease-out, opacity 0.3s ease-out;
        }

        .modal-enter-active .modal-overlay {
          opacity: 1;
        }

        .modal-enter-active .modal-content {
          transform: translateY(0);
          opacity: 1;
        }

        .modal-exit .modal-overlay {
          opacity: 1;
        }

        .modal-exit .modal-content {
          transform: translateY(0);
          opacity: 1;
        }

        .modal-exit-active .modal-overlay {
          opacity: 0;
        }

        .modal-exit-active .modal-content {
          transform: translateY(20px);
          opacity: 0;
        }
        /* Styles for the iframe containing the resume */
        .resume-iframe {
            width: 100%;
            height: 100vh; /* Take full viewport height */
            border: none;
            background-color: #1a202c; /* Match body background */
        }
        `}
      </style>

      {/* Transition Overlay */}
      <div className={`transition-overlay ${isTransitioning ? 'active' : ''}`}></div>

      {/* Navigation */}
      <nav className="fixed w-full bg-gray-900 bg-opacity-90 z-40 py-4 shadow-lg rounded-b-xl">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
          <h1 className="text-3xl font-bold text-indigo-400">Ayush Singh</h1>
          <ul className="flex space-x-6">
            <li>
              <button
                onClick={() => handleNavigate('home')}
                className={`text-lg font-medium hover:text-indigo-400 transition-colors duration-300 ${
                  activeSection === 'home' ? 'text-indigo-400' : 'text-gray-300'
                }`}
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigate('about')}
                className={`text-lg font-medium hover:text-indigo-400 transition-colors duration-300 ${
                  activeSection === 'about' ? 'text-indigo-400' : 'text-gray-300'
                }`}
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigate('projects')}
                className={`text-lg font-medium hover:text-indigo-400 transition-colors duration-300 ${
                  activeSection === 'projects' ? 'text-indigo-400' : 'text-gray-300'
                }`}
              >
                Projects
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigate('resume')}
                className={`text-lg font-medium hover:text-indigo-400 transition-colors duration-300 ${
                  activeSection === 'resume' ? 'text-indigo-400' : 'text-gray-300'
                }`}
              >
                Resume
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigate('contact')}
                className={`text-lg font-medium hover:text-indigo-400 transition-colors duration-300 ${
                  activeSection === 'contact' ? 'text-indigo-400' : 'text-gray-300'
                }`}
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content Area */}
      <div ref={contentRef} className="relative z-10 pt-20">
        {/* Home Section */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center text-center bg-gradient-to-br from-gray-900 to-gray-800 p-8"
        >
          <div className="max-w-4xl animate-on-scroll">
            <h2 className="text-6xl md:text-7xl font-extrabold leading-tight text-white mb-6">
              Hi, I'm <span className="text-indigo-400">Ayush Singh</span>.
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10">
              A passionate <span className="text-emerald-400">Computer Science student at Babu Banarasi Das University (BBDU)</span> specializing in Internet of Things and Blockchain, with a specialization in IBM.
            </p>
            <button
              onClick={() => handleNavigate('projects')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              View My Work
            </button>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center bg-gray-800 p-8">
          <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 py-16">
            <div className="md:w-1/2 animate-on-scroll">
              <h2 className="text-5xl font-bold text-white mb-6">About <span className="text-indigo-400">Me</span></h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                I am **Ayush Singh**, a passionate Computer Science student at **Babu Banarasi Das University (BBDU)**, specializing in **Internet of Things (IoT)** and **Blockchain** with an **IBM specialization**. My academic journey spans from **January 2023 to January 2027**.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                I am proficient in **Python**, **Java**, and **Web Development**. My interests primarily lie in **Cybersecurity**, **Blockchain Development**, and contributing to innovative tech solutions. I'm eager to apply my knowledge to real-world challenges and continue growing in the field.
              </p>

              <h3 className="text-3xl font-bold text-white mt-8 mb-4">Skills</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
                <div>
                  <h4 class="text-xl font-semibold text-indigo-300 mb-2">Languages:</h4>
                  <ul class="list-disc list-inside">
                    <li>Python</li>
                    <li>Java</li>
                    <li>JavaScript</li>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>C/C++</li>
                  </ul>
                </div>
                <div>
                  <h4 class="text-xl font-semibold text-indigo-300 mb-2">Web Technologies:</h4>
                  <ul class="list-disc list-inside">
                    <li>React.js</li>
                    <li>Node.js</li>
                    <li>Express.js</li>
                    <li>TailwindCSS</li>
                  </ul>
                </div>
                <div>
                  <h4 class="text-xl font-semibold text-indigo-300 mb-2">Databases:</h4>
                  <ul class="list-disc list-inside">
                    <li>MongoDB</li>
                    <li>MySQL</li>
                  </ul>
                </div>
                <div>
                  <h4 class="text-xl font-semibold text-indigo-300 mb-2">Cloud Platforms:</h4>
                  <ul class="list-disc list-inside">
                    <li>AWS (S3, EC2)</li>
                    <li>Azure</li>
                  </ul>
                </div>
                <div>
                  <h4 class="text-xl font-semibold text-indigo-300 mb-2">Cybersecurity:</h4>
                  <ul class="list-disc list-inside">
                    <li>Ethical Hacking</li>
                    <li>Penetration Testing</li>
                    <li>Network Security</li>
                  </ul>
                </div>
                <div>
                  <h4 class="text-xl font-semibold text-indigo-300 mb-2">Blockchain:</h4>
                  <ul class="list-disc list-inside">
                    <li>Ethereum</li>
                    <li>Solidity</li>
                    <li>Hyperledger Fabric</li>
                    <li>Truffle</li>
                    <li>Hardhat</li>
                  </ul>
                </div>
                <div>
                  <h4 class="text-xl font-semibold text-indigo-300 mb-2">IoT:</h4>
                  <ul class="list-disc list-inside">
                    <li>Arduino</li>
                    <li>Raspberry Pi</li>
                    <li>ESP32</li>
                    <li>MQTT</li>
                    <li>CoAP</li>
                  </ul>
                </div>
                <div>
                  <h4 class="text-xl font-semibold text-indigo-300 mb-2">AI/ML:</h4>
                  <ul class="list-disc list-inside">
                    <li>Natural Language Processing (NLP)</li>
                    <li>TensorFlow</li>
                    <li>Keras</li>
                    <li>PyTorch</li>
                    <li>scikit-learn</li>
                    <li>NLTK</li>
                    <li>OpenCV</li>
                  </ul>
                </div>
                <div>
                  <h4 class="text-xl font-semibold text-indigo-300 mb-2">Tools & Technologies:</h4>
                  <ul class="list-disc list-inside">
                    <li>VS Code</li>
                    <li>Postman</li>
                    <li>GitHub</li>
                    <li>Jenkins</li>
                    <li>Prometheus</li>
                    <li>Helm</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-3xl font-bold text-white mt-8 mb-4">Employment History</h3>
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-xl font-semibold text-indigo-300">Internship, AICTE TechSaitsham</h4>
                  <p className="text-gray-400 text-sm mb-2">Nov 2024 – Present</p>
                  <ul class="list-disc list-inside text-gray-300 mt-2">
                        <li>**Applied AI technologies (e.g., Python, TensorFlow)** to develop a prototype for **AI-driven learning recommendations**, achieving **85% accuracy** in predicting user learning paths.</li>
                        <li>**Designed, developed, and presented an independent project on "Transformative Learning with AI"** to a panel of **5 industry experts**, demonstrating the practical application of AI concepts and **receiving commendation for its potential to improve learning efficiency by 20%**.</li>
                    </ul>
                </div>
                <div class="bg-gray-700 p-4 rounded-lg">
                  <h4 class="text-xl font-semibold text-indigo-300">Intern, Cognifyz</h4>
                  <p class="text-gray-400 text-sm mb-2">Oct 2024 – Nov 2024</p>
                  <ul class="list-disc list-inside text-gray-300 mt-2">
                        <li>**Engineered and maintained 3 responsive websites** using HTML, CSS, and JavaScript, ensuring full mobile responsiveness and cross-browser compatibility.</li>
                        <li>**Collaborated with a 4-person cross-functional team** to implement user-centric UI/UX designs, **resulting in a 15% increase in user engagement** (e.g., measured by click-through rates on key features).</li>
                        <li>**Optimized website performance**, leading to a **10% reduction in page load times** across key landing pages.</li>
                    </ul>
                </div>
              </div>

              <h3 className="text-3xl font-bold text-white mt-8 mb-4">Certifications & Achievements</h3>
              <ul className="list-disc list-inside text-lg text-gray-300 space-y-2">
                <li>Web Development Basics - IBM SkillsBuild</li>
                <li>Data Visualization with Python - Cognitive Class (IBM)</li>
                <li>Cybersecurity Analyst Job Simulation - Forage</li>
                <li>Google Cloud Digital Leader</li>
                <li>CompTIA Security+</li>
                <li>Introduction to Blockchain (Coursera)</li>
                <li>Cloud Computing Fundamentals</li>
                <li>Blockchain Basics</li>
                <li>Introduction to Machine Learning</li>
                <li>Network Security Professional</li>
              </ul>

            </div>
            <div className="md:w-1/2 flex justify-center animate-on-scroll delay-200">
              <img
                src="https://placehold.co/400x400/334155/e2e8f0?text=Ayush+Singh"
                alt="Ayush Singh"
                className="rounded-full shadow-2xl border-4 border-indigo-500 w-64 h-64 md:w-80 md:h-80 object-cover"
              />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen bg-gray-900 p-8">
          <div className="container mx-auto py-16">
            <h2 className="text-5xl font-bold text-white text-center mb-12 animate-on-scroll">My <span className="text-indigo-400">Projects</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="project-card bg-gray-800 rounded-xl shadow-xl overflow-hidden cursor-pointer animate-on-scroll"
                  style={{ transitionDelay: `${index * 0.1}s` }} // Staggered animation
                  onClick={() => openProjectModal(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover object-center"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/334155/e2e8f0?text=${project.title.replace(/\s/g, '+')}`; }}
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-indigo-400 text-sm font-medium mb-3">{project.category}</p>
                    <p className="text-gray-300 text-base">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resume Section */}
        <section id="resume" className="min-h-screen bg-gray-800 p-4 flex items-center justify-center">
            <div className="container mx-auto py-8 w-full h-full">
                <h2 className="text-5xl font-bold text-white text-center mb-8 animate-on-scroll">My <span className="text-indigo-400">Resume</span></h2>
                <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden h-[calc(100vh-180px)]"> {/* Adjust height to fit viewport better */}
                    <iframe
                        srcDoc={resumeHtmlContent}
                        title="Ayush Singh Resume"
                        className="resume-iframe"
                    ></iframe>
                </div>
            </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center bg-gray-800 p-8">
          <div className="container mx-auto py-16">
            <h2 className="text-5xl font-bold text-white text-center mb-12 animate-on-scroll">Get In <span className="text-indigo-400">Touch</span></h2>
            <div className="max-w-2xl mx-auto bg-gray-900 rounded-xl shadow-xl p-8 animate-on-scroll">
              <p className="text-lg text-gray-300 text-center mb-6">
                Feel free to reach out to me via email at <a href="mailto:Ayu.rajput0123@gmail.com" className="text-indigo-400 hover:underline">Ayu.rajput0123@gmail.com</a> or use the form below.
              </p>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-300 text-lg font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 text-lg font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-300 text-lg font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                    placeholder="Your message..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 py-8 text-center text-gray-400 text-sm">
          <div className="container mx-auto px-4">
            <p>&copy; {new Date().getFullYear()} Ayush Singh. All rights reserved.</p>
            <p className="mt-2">Designed with passion and code.</p>
          </div>
        </footer>
      </div>

      {/* Project Detail Modal */}
      {showProjectModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 modal-overlay modal-enter">
          <div className="bg-gray-800 rounded-xl shadow-2xl p-8 max-w-3xl w-full mx-4 modal-content modal-enter-active transform scale-95 opacity-0">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-4xl font-bold text-indigo-400">{selectedProject.title}</h3>
              <button
                onClick={closeProjectModal}
                className="text-gray-400 hover:text-white transition-colors duration-200 text-3xl font-bold"
              >
                &times;
              </button>
            </div>
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-64 object-cover object-center rounded-lg mb-6"
              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/334155/e2e8f0?text=${selectedProject.title.replace(/\s/g, '+')}`; }}
            />
            <p className="text-gray-300 text-lg leading-relaxed mb-4">{selectedProject.details}</p>
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-white mb-2">Technologies Used:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-indigo-600 text-white text-sm px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <button
                onClick={closeProjectModal}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

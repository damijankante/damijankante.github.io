// In development, this component will display a comprehensive overview of the user's professional journey, skills, and accomplishments.

const CV = () => {                                                                              
  return (
    <section id="cv" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Curriculum Vitae
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive overview of my professional journey, skills, and accomplishments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Education Section */}
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Education</h3>
            <ul className="list-disc list-inside">
              <li>B.B.A. in Business - Doba Faculty of Applied Business and Social Studies (2008 - 2012)</li>
              <li>A.A.S. in Logistics - Vocational College of Traffic Maribor (2002 - 2006)</li>
            </ul>
          </div>

          {/* Experience Section */}
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Experience</h3>
            <ul className="list-disc list-inside">
              <li>Slovenian and Croatian Team Lead at Velocity Global (2024 - 2025)</li>
              <li>Data Entry Team Lead at Velocity Global (2018 - 2024)</li>
              <li>Data Entry Specialist at Upwork Enterprise Services (2012 - 2018)</li>
              <li>Head of Graphics Studio (2010 - 2012)</li>
              <li>Graphic Designer/Editor (2006 - 2010)</li>
            </ul>
          </div>

          {/* Skills Section */}
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Skills</h3>
            <ul className="list-disc list-inside">
              <li>Programming Languages: Python, SQL, C++, Java</li>
              <li>Data Analysis and Visualization: Excel, Powerpoint, Power BI, Tableau</li>
              <li>Web Development: HTML, CSS, JavaScript, React.js, Node.js, Typescript, Git, GitHub</li>
              <li>Design Tools: Adobe Creative Suite, Figma, Canva</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CV;
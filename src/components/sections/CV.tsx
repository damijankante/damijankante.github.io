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
              <li>B.Sc. in Computer Science - XYZ University (2015 - 2019)</li>
              <li>M.Sc. in Data Science - ABC University (2020 - 2022)</li>
            </ul>
          </div>

          {/* Experience Section */}
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Experience</h3>
            <ul className="list-disc list-inside">
              <li>Software Engineer at Company A (2019 - 2021)</li>
              <li>Data Scientist at Company B (2021 - Present)</li>
            </ul>
          </div>

          {/* Skills Section */}
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Skills</h3>
            <ul className="list-disc list-inside">
              <li>Programming Languages: Python, R, SQL</li>
              <li>Data Visualization: Tableau, Power BI</li>
              <li>Web Development: JavaScript, React, Node.js</li>
              <li>Design Tools: Adobe Creative Suite, Figma</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CV;
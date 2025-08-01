import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MedicalForm } from "./components/MedicalForm";
import { ResultsPanel } from "./components/ResultsPanel";
import { useMedicalConsultation } from "./hooks/useMedicalConsultation";

function App() {
  const {
    inputType,
    textInput,
    audioUrl,
    loading,
    result,
    error,
    setInputType,
    setTextInput,
    setAudioUrl,
    handleSubmit,
    resetForm,
  } = useMedicalConsultation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <Header
          title="Telepatía"
          subtitle="AI-Powered Medical Consultation Assistant"
          description="Upload audio or enter text to get instant medical analysis, diagnosis, and treatment recommendations"
        />

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <MedicalForm
              inputType={inputType}
              textInput={textInput}
              audioUrl={audioUrl}
              loading={loading}
              error={error}
              onInputTypeChange={setInputType}
              onTextInputChange={setTextInput}
              onAudioUrlChange={setAudioUrl}
              onSubmit={handleSubmit}
              onReset={resetForm}
            />

            <ResultsPanel result={result} loading={loading} />
          </div>
        </div>

        <Footer
          appName="Telepatía Medical AI"
          disclaimer="This is a demonstration system. Always consult with qualified medical professionals for actual medical advice."
        />
      </div>
    </div>
  );
}

export default App;

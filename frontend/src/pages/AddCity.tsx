import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Trash2, Save, MapPin, Loader2 } from "lucide-react";
import { apiService, CitySection, InfoSection, LinkButton } from "@/services/api";

interface CityFormData {
  name: string;
  country: string;
  description: string;
  population: string;
  highlights: string[];
  icon: string;
  sections: CitySection[];
}

const iconOptions = [
  { value: "/src/assets/vilnius-icon.png", label: "Vilnius Style" },
  { value: "/src/assets/utena-icon.png", label: "Utena Style" },
  { value: "custom", label: "Custom Path" }
];

const sectionIconOptions = [
  { value: "Home", label: "🏠 Home" },
  { value: "UtensilsCrossed", label: "🍽️ Food & Dining" },
  { value: "Bus", label: "🚌 Transportation" },
  { value: "Wifi", label: "📶 Essential Services" },
  { value: "MapPin", label: "📍 Recreation" },
  { value: "Briefcase", label: "💼 Business" },
  { value: "GraduationCap", label: "🎓 Education" },
  { value: "Heart", label: "❤️ Healthcare" }
];

const AddCity = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<CityFormData>({
    name: "",
    country: "",
    description: "",
    population: "",
    highlights: ["", "", "", ""],
    icon: "/src/assets/vilnius-icon.png",
    sections: [{
      title: "Find Your Home",
      icon: "Home",
      defaultExpanded: true,
      infoSections: [{
        title: "Popular Areas",
        items: ["", "", "", ""]
      }],
      links: [{ text: "", href: "" }]
    }]
  });

  const updateBasicField = (field: keyof Omit<CityFormData, 'highlights' | 'sections'>, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateHighlight = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.map((h, i) => i === index ? value : h)
    }));
  };

  const addHighlight = () => {
    setFormData(prev => ({
      ...prev,
      highlights: [...prev.highlights, ""]
    }));
  };

  const removeHighlight = (index: number) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const updateSection = (sectionIndex: number, field: keyof CitySection, value: any) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === sectionIndex ? { ...section, [field]: value } : section
      )
    }));
  };

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, {
        title: "",
        icon: "MapPin",
        infoSections: [{ title: "", items: ["", "", "", ""] }],
        links: [{ text: "", href: "" }]
      }]
    }));
  };

  const removeSection = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }));
  };

  const updateInfoSection = (sectionIndex: number, infoIndex: number, field: keyof InfoSection, value: any) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === sectionIndex ? {
          ...section,
          infoSections: section.infoSections.map((info, j) =>
            j === infoIndex ? { ...info, [field]: value } : info
          )
        } : section
      )
    }));
  };

  const addInfoSection = (sectionIndex: number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === sectionIndex ? {
          ...section,
          infoSections: [...section.infoSections, { title: "", items: ["", "", "", ""] }]
        } : section
      )
    }));
  };

  const removeInfoSection = (sectionIndex: number, infoIndex: number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === sectionIndex ? {
          ...section,
          infoSections: section.infoSections.filter((_, j) => j !== infoIndex)
        } : section
      )
    }));
  };

  const updateInfoSectionItem = (sectionIndex: number, infoIndex: number, itemIndex: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === sectionIndex ? {
          ...section,
          infoSections: section.infoSections.map((info, j) =>
            j === infoIndex ? {
              ...info,
              items: info.items.map((item, k) => k === itemIndex ? value : item)
            } : info
          )
        } : section
      )
    }));
  };

  const addInfoSectionItem = (sectionIndex: number, infoIndex: number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === sectionIndex ? {
          ...section,
          infoSections: section.infoSections.map((info, j) =>
            j === infoIndex ? {
              ...info,
              items: [...info.items, ""]
            } : info
          )
        } : section
      )
    }));
  };

  const updateLink = (sectionIndex: number, linkIndex: number, field: keyof LinkButton, value: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === sectionIndex ? {
          ...section,
          links: section.links.map((link, j) =>
            j === linkIndex ? { ...link, [field]: value } : link
          )
        } : section
      )
    }));
  };

  const addLink = (sectionIndex: number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === sectionIndex ? {
          ...section,
          links: [...section.links, { text: "", href: "" }]
        } : section
      )
    }));
  };

  const removeLink = (sectionIndex: number, linkIndex: number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === sectionIndex ? {
          ...section,
          links: section.links.filter((_, j) => j !== linkIndex)
        } : section
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Clean up empty values
      const cleanedData = {
        ...formData,
        highlights: formData.highlights.filter(h => h.trim() !== ""),
        path: `/${formData.name.toLowerCase().replace(/\s+/g, '-')}`,
        sections: formData.sections.map(section => ({
          ...section,
          infoSections: section.infoSections.map(info => ({
            ...info,
            items: info.items.filter(item => item.trim() !== "")
          })).filter(info => info.title.trim() !== "" && info.items.length > 0),
          links: section.links.filter(link => link.text.trim() !== "" && link.href.trim() !== "")
        })).filter(section => section.title.trim() !== "")
      };

      const response = await apiService.createCity(cleanedData);
      
      if (response.success) {
        navigate('/');
      } else {
        setError('Failed to create city');
      }
    } catch (err) {
      setError('Failed to create city. Please try again.');
      console.error('Error creating city:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="gap-2 hover:bg-card/50 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Cities
            </Button>
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Add Your City
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Share your local knowledge and help others settle into your city. 
              Create a comprehensive guide with all the essential information.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">City Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateBasicField('name', e.target.value)}
                    placeholder="e.g., Kaunas"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => updateBasicField('country', e.target.value)}
                    placeholder="e.g., Lithuania"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateBasicField('description', e.target.value)}
                  placeholder="A brief, compelling description of your city..."
                  rows={3}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="population">Population</Label>
                  <Input
                    id="population"
                    value={formData.population}
                    onChange={(e) => updateBasicField('population', e.target.value)}
                    placeholder="e.g., 280,000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="icon">City Icon</Label>
                  <Select value={formData.icon} onValueChange={(value) => updateBasicField('icon', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an icon style" />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formData.icon === "custom" && (
                    <Input
                      placeholder="Custom icon path"
                      onChange={(e) => updateBasicField('icon', e.target.value)}
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Highlights */}
          <Card>
            <CardHeader>
              <CardTitle>Key Highlights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.highlights.map((highlight, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={highlight}
                    onChange={(e) => updateHighlight(index, e.target.value)}
                    placeholder={`Highlight ${index + 1}`}
                  />
                  {formData.highlights.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeHighlight(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addHighlight}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Highlight
              </Button>
            </CardContent>
          </Card>

          {/* Sections */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Sections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.sections.map((section, sectionIndex) => (
                <Card key={sectionIndex} className="border-2">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Section {sectionIndex + 1}</CardTitle>
                      {formData.sections.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeSection(sectionIndex)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Section Title *</Label>
                        <Input
                          value={section.title}
                          onChange={(e) => updateSection(sectionIndex, 'title', e.target.value)}
                          placeholder="e.g., Find Your Home"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Section Icon</Label>
                        <Select
                          value={section.icon}
                          onValueChange={(value) => updateSection(sectionIndex, 'icon', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {sectionIconOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Info Sections */}
                    <div className="space-y-4">
                      <Label className="text-base font-semibold">Information Sections</Label>
                      {section.infoSections.map((infoSection, infoIndex) => (
                        <Card key={infoIndex} className="border">
                          <CardContent className="pt-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <Input
                                value={infoSection.title}
                                onChange={(e) => updateInfoSection(sectionIndex, infoIndex, 'title', e.target.value)}
                                placeholder="Info section title"
                                className="font-medium"
                              />
                              {section.infoSections.length > 1 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeInfoSection(sectionIndex, infoIndex)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                            
                            {infoSection.items.map((item, itemIndex) => (
                              <Input
                                key={itemIndex}
                                value={item}
                                onChange={(e) => updateInfoSectionItem(sectionIndex, infoIndex, itemIndex, e.target.value)}
                                placeholder={`Item ${itemIndex + 1}`}
                              />
                            ))}
                            
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => addInfoSectionItem(sectionIndex, infoIndex)}
                              className="gap-2"
                            >
                              <Plus className="w-4 h-4" />
                              Add Item
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                      
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addInfoSection(sectionIndex)}
                        className="gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Info Section
                      </Button>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                      <Label className="text-base font-semibold">Useful Links</Label>
                      {section.links.map((link, linkIndex) => (
                        <div key={linkIndex} className="flex gap-2">
                          <Input
                            value={link.text}
                            onChange={(e) => updateLink(sectionIndex, linkIndex, 'text', e.target.value)}
                            placeholder="Link text"
                          />
                          <Input
                            value={link.href}
                            onChange={(e) => updateLink(sectionIndex, linkIndex, 'href', e.target.value)}
                            placeholder="https://..."
                          />
                          {section.links.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => removeLink(sectionIndex, linkIndex)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addLink(sectionIndex)}
                        className="gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Link
                      </Button>
                    </div>

                  </CardContent>
                </Card>
              ))}
              
              <Button
                type="button"
                variant="outline"
                onClick={addSection}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Section
              </Button>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="gap-2 min-w-40"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {loading ? 'Creating City...' : 'Create City'}
            </Button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default AddCity; 